# nura

<div align="center">
  <a href="https://reactjs.org/" target="_blank">
    <img
      src="https://img.shields.io/badge/Written%20in-React-%23EF4041?style=for-the-badge"
      height="30"
    />
  </a>
  <a href="https://nura.micartey.dev/" target="_blank">
    <img
      src="https://img.shields.io/badge/live%20on-micartey-%27a147.svg?style=for-the-badge"
      height="30"
    />
  </a>
</div>

## 📚 Introduction

nura is a [PWA](#what-is-a-pwa) that allows you to create and manage your passwords. To start right of, you have to create an account. The backend is also open source and you can find it [here](https://github.com/nura-vault/nura-backend)

<div align="center">
    <img
       src="https://i.imgur.com/WqGBNWx.png"
    />
</div>

## 📥 What is a PWA?

Some might say that `PWA` is a new concept. But it is not. It is a standard that is being used by many web developers. It is a way to make your website load faster through the use of a [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/). `PWA` stands for `Progressive Web App` and as the name already states, it is an app. Once you visit the website, it will be cached and you can access it offline. You can also install it through your browser. This is only possible if a secure connection is given (e.g. HTTPS).

## 🔑 Encryption & Decryption

Your login password will be hashed and stored in a database which is, thanks to docker, not exposed to the outside. The password will be locally hashed in `SHA256`. Which is currently one of the most secure hashing algorithms. Hashing it locally also prevents others from sniffing your network traffic and reading your password. Event though your connection is encrypted, thanks to HTTPS.

Your passwords are also stored in the database but encrypted with a key that is stored in the browser. This key is a second password, a pass-phrase which is hashed in `SHA256` as well. To be able to encrypt your passwords a symmetric encryption algorithm is used. This algorithm is called `AES256`. However, each passwords encryption varies. Therefore even the same passwords produce different outputs. This makes it even safer to use!

<div align="center">
    <img
        src="https://i.imgur.com/ZKRjgU2.png"
    />
</div>

**DO NOT FORGET THIS PASS-PHRASE**

If you do, no-one will be able to restore your passwords. Because the key is nowhere stored in the database, nura can't identify if your pass-phrase is correct. But if it is not, you cannot decrypt your passwords.

### ✈ Offline

Some might argue that being able to use a password manager offline is useless since you can't use your passwords anywhere. However, being able to access your passwords everywhere is a great feature to have. Thanks to the [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) the whole side will be cached with the **Stale-While-Revalidate** strategy:

<div align="center">
    <img
      src="https://i.imgur.com/LoQATnO.png"
    />
</div>

An important aspect to mention is, that your passwords are sill encrypted when saved to the local storage. The local storage is never exposed to other websites and messurements against [XSS](https://owasp.org/www-community/attacks/xss/) were taken. This means that the local storage is a rather safe place to store your passwords. However even with acess to the local storage, it's still hard to decrypt your passwords.

## 💿 Installation

You can visit [nura](https://nura-pwa.vercel.app/) to create an account and start right away. As an alternative you can install the app through your browser or even install nura as an application written in [electron](https://www.electronjs.org/). The installation process is quite simple and intuitive. First you have to download the latest release of the installer form the [releases](https://github.com/nura-vault/nura-pwa/releases) for your platform (*currently windows only*).

## 🧱 Build it yourself

In case you want to host it yourself because of security concerns, make sure to have either [docker](https://www.docker.com/) or [Java-11](http://jdk.java.net/java-se-ri/11) and [Node.js](https://nodejs.org/en/) installed. It is recommended to use [docker](https://www.docker.com/) though, since it provides additional security (e.g. to the database). Here is an installation guide for the **webpage**. You can find an installation guide for the backend [here](https://github.com/nura-vault/nura-backend). In case you want to use your own backend, make sure to edit the `src/config.ts` file after cloning.

### 🐳 Dockerized

First of all make sure you have docker, docker-compose as well as git installed.
Then execute following commands:

```shell
$ git clone https://github.com/nura-vault/nura-pwa.git .
$ docker-compose up -d
```

The docker container should expose port `:80`

### 📀 Node.js

In case you  just want to build the app yourself, you can use the following command:

``` shell
$ npm run build
```

Now you can deploy the production elsewhere. It is recommended to use [nginx](https://www.nginx.com/) as a reverse proxy and [certbot](https://certbot.eff.org/) to get a ssl certificate to ensure an secure connection.

<details>
    <summary> Installation on nginx with certbot </summary>

## 🔐 Get your ssl certificate

You can do this by adding following lines to `/etc/ningx/nginx.conf`.
Make sure to enter your domain (or subdomain) in the `server_name` field.

```
server {
    listen 80;
    server_name nura.mydomain.com;

    location / {
        http://localhost:80;
    }
}
```

And to get the certificate, execute the following command after installing certbot and setting up nginx:

```shell
$ certbot --nginx
```
</details>