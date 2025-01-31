/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

import { login, logout, findByToken, modifyUser } from "@/api/member";

import { httpStatusCode } from "@/util/http-status";

import axios from "axios";

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();

  const isLogin = ref(false);
  const isLoginError = ref(false);
  const nickname = ref(null);
  const token = ref(null);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const initializeAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      token.value = accessToken;
      isLogin.value = true;
    }
  };

  const userLogin = async (loginUser) => {
    await login(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          let { data } = response;
          let accessToken = data["accessToken"];

          isLogin.value = true;
          isLoginError.value = false;
          nickname.value = data["nickname"];
          token.value = accessToken;

          localStorage.setItem("accessToken", accessToken); //로컬스토리지 토큰 저장

          findByToken(
            (response) => {
              if (response.status === httpStatusCode.OK) {
                let { data } = response;
                userInfo.value = data;
              } else {
                console.log("유저 정보 없음!!!!");
              }
            },
            async (error) => {
              console.log(error);
              console.error(
                "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                error.response.status
              );
            }
          );
        } else {
          isLogin.value = false;
          isLoginError.value = true;
        }
      },
      (error) => {
        console.error(error);
      },
      { persist: true }
    );
  };
  const getUserInfo = async (token) => {
    await findByToken(
      (response) => {
        if (response.status === httpStatusCode.OK) {
          let { data } = response;
          userInfo.value = data;
        } else {
          console.log("");
        }
      },
      async (error) => {
        console.error(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
      }
    );
    return userInfo.value;
  };
  const updateUserInfo = async (updatedUserInfo) => {
    try {
      modifyUser(
        updatedUserInfo,
        (response) => {
          let msg = "로그아웃 중 에러 발생했습니다..";
          if (response.status === httpStatusCode.OK) {
            msg = "사용자 정보가 성공적으로 업데이트되었습니다.";
            userInfo.value = updatedUserInfo;
            alert(msg);
          } else {
            console.error("사용자 정보 업데이트 실패:", response);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
    }
  };
  const userLogout = async (userEmail) => {
    await logout(
      userEmail,
      (response) => {
        let msg = "로그아웃 중 에러 발생했습니다..";
        if (response.status === httpStatusCode.OK) {
          isLogin.value = false;
          userInfo.value = null;
          isValidToken.value = false;

          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");

          msg = "로그아웃 되었습니다.";
          alert(msg);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return {
    isLogin,
    isLoginError,
    nickname,
    token,
    userInfo,
    userLogin,
    getUserInfo,
    initializeAuth,
    updateUserInfo,
    userLogout,
  };
});
