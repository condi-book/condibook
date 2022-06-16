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
            let user = await User.findOne({ where: { email } });

            // 존재하지 않은 사용자 -> 계정 생성
            if (!user) {
                user = await User.create({ nickname, email, image_url });
            }

            // JWT 생성
            const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
            const token = jwt.sign(
                { user_id: user.id, email: user.email },
                secretKey,
            );

            // 사용자 정보 + JWT 반환
            const myFolderIds = await folderService.getMyFolderIds({
                user_id: user.id,
            });

            let bookmarkCount = 0;
            if (myFolderIds.length > 0) {
                bookmarkCount = await bookmarkService.getMyBookmarkCount({
                    folderIds: myFolderIds,
                });
            }

            const result = {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                image_url: user.image_url,
                intro: user.intro ?? null,
                token: token,
                folderCount: myFolderIds.length,
                bookmarkCount,
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

    static async setNickname({ nickname, id }) {
        try {
            const affectedRows = await User.update(
                { nickname },
                { where: { id: id } },
            );

            if (affectedRows === 0) {
                return getFailMsg({ entity: "사용자 이름", action: "수정" });
            }
            return getSuccessMsg({ entity: "사용자 이름", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async setIntro({ intro, id }) {
        try {
            const affectedRows = await User.update(
                { intro },
                { where: { id: id } },
            );

            if (affectedRows === 0) {
                return getFailMsg({
                    entity: "사용자 자기소개글",
                    action: "수정",
                });
            }
            return getSuccessMsg({
                entity: "사용자 자기소개글",
                action: "수정",
            });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteUser({ id }) {
        try {
            const deletedRow = await User.destroy({ where: { id: id } });

            if (deletedRow !== 1) {
                return getFailMsg({ entity: "사용자 계정", action: "삭제" });
            }
            return getSuccessMsg({ entity: "사용자 계정", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async getUserInfo({ id }) {
        const result = User.findOne({ where: { id: id } });

        if (!result) {
            return { errorMessage: "해당 유저정보가 없습니다." };
        }

        return result;
    }
}

export { userService };
