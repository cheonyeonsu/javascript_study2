$(".register").click(function () {
  // 1. 회원가입 버튼을 눌렀을 때 입력했는지 안했는지 확인하기
  const email = $(`#inputEmail3`).val();
  const passward = $("#inputPassword3").val();
  const gender = $("#gender").val();
  let like = "";

  $("input[name=gridRadios]").each(function () {
    var value = $(this).val();
    var checked = $(this).prop("checked");

    if (checked) {
      like = value;
      return;
    }
  });

  if (!id) {
    alert("아이디를 입력해주세요!");
    return;
  }
  if (!email) {
    alert("이메일을 입력해주세요!");
    return;
  } else {
    if (!emailCheck(email)) {
      //이메일 형식에 맞지 않을 때
      alert("이미 사용중이거나 탈퇴한 아이디입니다.");
      return;
    }
  }

  if (!password) {
    //비밀번호에 입력된 게 없을 때
    alert("비밀번호를 입력해주세요!");
    return;
  } else {
    if (!pwdCheck(password)) {
      alert("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.!");
      return;
    }
  }

  //비밀번호 재확인

  alert("회원가입이 완료되었습니다!");
  location.href = "./index.html";
});

function pwdCheck(pwd) {
  //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
  const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return reg.test(pwd); //맞으면 true, 틀리면 false를 준다.
}

function emailCheck(email) {
  const reg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return reg.test(email); //맞으면 true, 틀리면 false를 준다.
}
