//1. 전체 url 가져오기
const currentURL = location.href;
console.log(currentURL);

//2. 쿼리 스트링에 있는 파라메터 가져오기
const urlobj = new URL(currentURL);

//파라메터에 대한 정보를 가지고 있음.
const params = urlobj.searchParams;
console.log(params);
// 파라메터의 값을 구한다. params.get("변수명");
const q = params.get("q");
const krsity = params.get.apply("krsity");

console.log(q, krsity);

//3. ajax 이용해 전체 날씨 정보 얻어오기.
function getCityWedther(q) {
  var temp = {};
  var urlAPI =
    "https://api.openweathermap.org/data/2.5/weather?appid=bf27368383a75d0ff5359ae9fbffd567&units=metric&lang=kr";
  urlAPI += "&q=" + q;

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

//4.데이터 바인딩 작업
$(".region.title").text(`${krcity} 상세날씨`);
let temp = getCityWedther(q);
