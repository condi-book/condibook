import { User } from "../../db";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getSuccessMsg, getFailMsg } from "../../util/message";
import { folderService } from "../folder/folderService";
import { bookmarkService } from "../bookmark/bookmarkService";
class userService {
    static async login({ nickname, email, image_url }) {
        try {
            // 사용자 조회
            let user = await User.findOneByEmail({ email });
            // 존재하지 않은 사용자 -> 계정 생성
            if (!user) {
                user = await User.create({ nickname, email, image_url });
            }
            // JWT 생성
            const payload = { user_id: user.id, email: user.email };
            const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
            const options = { expiresIn: "5d" };

            const token = jwt.sign(payload, secretKey, options);
            // 사용자 정보 + JWT 반환
            const result = {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                image_url: user.image_url,
                intro: user.intro ?? null,
                token: token,
            };
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getKakaoToken(code) {
        try {
            // 코드로 토큰 발급
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirect_uri:
                        process.env.CLIENT_URL + "/callback/login/kakao",
                    code: code,
                }),
            );
            const token = res.data.access_token;
            return token;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getKakaoAccount(token) {
        try {
            // 토큰으로 사용자 정보 조회
            const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const account = {
                nickname: res.data.properties.nickname,
                email: res.data.kakao_account.email,
                image_url: res.data.properties.profile_image,
            };
            return account;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getGoogleToken(code) {
        try {
            // 코드로 토큰 발급
            const res = await axios.post(
                "https://oauth2.googleapis.com/token",
                new URLSearchParams({
                    code: code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri:
                        process.env.CLIENT_URL + "/callback/login/google",
                    grant_type: "authorization_code",
                }),
            );
            const token = res.data.access_token;
            return token;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getGoogleAccount(token) {
        try {
            const res = await axios.get(
                `https://www.googleapis.com/oauth2/v2/userinfo?${token}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (res.data.verified_email === false) {
                return {
                    errorMessage: "인증된 구글계정으로만 가입할 수 있습니다.",
                };
            }
            const account = {
                nickname: res.data.name,
                email: res.data.email,
                image_url: res.data.picture,
            };
            return account;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async getUserInfo({ user_id }) {
        try {
            const user = await User.findOne({ user_id });
            if (!user) {
                return getFailMsg({ entity: "사용자 계정", action: "조회" });
            }
            const myFolderIds = await folderService.getUserFolderIds({
                user_id: user.id,
            });
            let bookmarkCount = 0;
            if (myFolderIds.length > 0) {
                bookmarkCount = await bookmarkService.getBookmarkCountInFolders(
                    {
                        folder_ids: myFolderIds,
                    },
                );
            }
            const result = {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                image_url: user.image_url,
                intro: user.intro ?? null,
                folderCount: myFolderIds.length,
                bookmarkCount,
            };
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async getUsersInfo({ nickname }) {
        try {
            const user = await User.findAllByNickname({ nickname });
            if (!user) {
                return getFailMsg({ entity: "사용자 계정", action: "조회" });
            }
            return user;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async setNickname({ nickname, requester_id }) {
        try {
            // 사용자 존재 여부 확인
            const user = await User.findOne({ user_id: requester_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 닉네임 수정
            const affectedRows = await User.updateNickname({
                user_id: user.id,
                nickname,
            });
            if (affectedRows === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "사용자 이름", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async setIntro({ intro, requester_id }) {
        try {
            // 사용자 존재 여부 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 짧은 소개글 수정
            const affectedRows = await User.updateIntro({
                user_id: requester.id,
                intro,
            });
            if (affectedRows === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({
                entity: "사용자 자기소개글",
                action: "수정",
            });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteUser({ requester_id }) {
        try {
            // 사용자 존재 여부 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 사용자 삭제
            const deletedRow = await User.destroyOne({ user_id: requester.id });
            if (deletedRow !== 1) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "사용자 계정", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async validationUser({ userInfo }) {
        try {
            const id = userInfo.user_id;
            const email = userInfo.email;
            const checkUser = await User.findOneByUserIdEmail({
                user_id: id,
                email,
            });
            if (!checkUser) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            return checkUser;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { userService };
