FROM python:3.8.13-slim

RUN mkdir /app

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y gcc g++

RUN apt-get install -y default-jdk
ENV JAVA_HOME /usr/local/java

COPY . ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5004

CMD ["python3", "app.py"]