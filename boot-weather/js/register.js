$(".register").click(function () {
  // 1. 회원가입 버튼을 눌렀을 때 입력했는지 안했는지 확인하기
  const email = $(`#inputEmail3`).val();
  const passward = $("#inputPassword3").val();
  const gender = $("#gender").val();
  let like = "";

  //라디오 버튼의 value를 가져오는 법(1개밖에 선택 불가능) [type='radio'] : 여러개를 한꺼번에 가져올 때 쓰는 each.  []테그의 속성을 이용해 가져옴
  $("input[name=gridRadios]").each(function () {
    var value = $(this).val(); //this는 선택자가 현재 가르키는 요소[태그](element)
    //사용자가 체크한 값만 가져오기
    var checked = $(this).prop("checked"); //체크한 상태인지 아닌지 확인

    if (checked) {
      like = value;
      return; //함수는 return문을 만나면 끝난다. (목적을 이루면 함수를 끝낸다.)
    }
  });

  // 2. 비밀번호, 이메일 양식이 맞지 않으면 알려주기
  //**중요** null, undifinded, ''(빈문자열), 0 : 무조건 false

  if (!email) {
    //이메일에 입력된 게 없을 때
    alert("이메일을 입력해주세요!");
    return; //리턴문 줘서 함수 끝내벌임
  } else {
    //이메일이 입력 됐을 때
    if (!emailCheck(email)) {
      //이메일 형식에 맞지 않을 때
      alert("이메일 형식에 맞지 않습니다!");
      return;
    }
  }

  if (!password) {
    //비밀번호에 입력된 게 없을 때
    alert("비밀번호를 입력해주세요!");
    return;
  } else {
    if (!pwdCheck(password)) {
      alert("비밀번호 형식에 맞지 않습니다!");
      return;
    }
  }

  if (!gender) {
    //성별에 입력된 게 없을 때
    alert("성별을 입력해주세요!");
    return;
  }

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
