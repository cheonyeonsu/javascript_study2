(function () {
  /* 1. 접속자 위치정보 가져오기*/

  //현재 위치 가져오기
  navigator.geolocation.getCurrentPosition(getCurrentPosition, getError);
  /* navigator.geolocation.getCurrentPosition(위치정보 가져오기 성공할 때,위치정보 가져오기 실패했을 때)*/

  var cityList = [
    "seoul",
    "incheon",
    "busan",
    "daegu",
    "daejeon",
    "jeju",
    "gangneung",
    "bucheon",
    "gimhae",
    "gyeongju",
    "iksan",
    "yeosu",
  ];

  for (const city of cityList) {
    let temp = getWeatherWithCity(city);
    $("." + city + " > .celsius").text(`${temp.celsius}℃`);

    var iconURL = "https://openweathermap.org/img/wn/";
    $("." + city + " > .icon > img").attr("src", iconURL + temp.icon + ".png");
  }

  //위치정보 가져오기 성공(허용) : position안에 사용자의 위치정보가 들어있다.
  function getCurrentPosition(position) {
    //위경도 가져오는 법
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
    loadMap(lat, lon);
  }

  //위치정보 가져오기 실패(거부)
  function getError() {
    console.error("사용자의 위치정보를 가져오는 데 실패했습니다.");
  }

  //카카오맵 실행해주는 함수
  function loadMap(lat, lon) {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    /* 2. 마커 표시 */

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lon);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    /*3.좌표(위경도)를 주소로 변환 :  04.14.금*/

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        //이런거 몰라도 됨 흐름만 알면 됨

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            let juso = result[i];
            console.log(juso);

            $(".region1-depth").text(juso.region_1depth_name);
            $(".region3-depth").text(juso.region_3depth_name);

            //온도구하기
            let temp = getWeather(lat, lon);
            $(".region-weather").text(`${temp.celsius}℃`);

            //아이콘 바꾸기
            var iconURL = "https://openweathermap.org/img/wn/";
            $("region-icon").attr("src", iconURL + temp.icon + ".png");

            break;
          }
        }
      }
    }
  }

  //오픈웨더에서 현재온도 가져오기(아이작스 - 슬랙에보내주심 10:17)
  function getWeather(lat, lon) {
    var urlAPI =
      "https://api.openweathermap.org/data/2.5/weather?appid=bf27368383a75d0ff5359ae9fbffd567&units=metric&lang=kr";
    urlAPI += "&lat=" + lat;
    urlAPI += "&lon=" + lon;
    var temp = {};

    $.ajax({
      type: "GET",
      url: urlAPI,
      dataType: "json",
      async: false, //동기상태 > 아이작스는 원래 기본적으로 비동기.
      success: function (data) {
        temp.celsius = data.main.temp.toFixed(0);
        temp.icon = data.weather[0].icon;
        $("region-weather").text(`${temp.celsius}℃`);
      },

      error: function (request, status, error) {
        console.log("code:" + request.status);
        console.log("message:" + request.responseText);
        console.log("error:" + error);
      },
    });

    console.log(temp);
    return temp;
  }

  //도시의 날씨 구하기
  function getWeatherWithCity(city) {
    var temp = {};
    var urlAPI =
      "https://api.openweathermap.org/data/2.5/weather?appid=bf27368383a75d0ff5359ae9fbffd567&units=metric&lang=kr";
    urlAPI += "&q=" + city; //필요한 내용은 q//

    $.ajax({
      type: "GET",
      url: urlAPI,
      dataType: "json",
      async: false,
      success: function (data) {
        temp.celsius = data.main.temp.toFixed(0);
        temp.icon = data.weather[0].icon;
        $("region-weather").text(`${temp.celsius}℃`);
      },

      error: function (request, status, error) {
        console.log("code:" + request.status);
        console.log("message:" + request.responseText);
        console.log("error:" + error);
      },
    });

    return temp;
  }
})(); // (function(){})(); 콜백함수 모양 틀리지 않기!! //
