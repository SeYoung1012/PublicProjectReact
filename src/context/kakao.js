const { kakao } = window;

export default function KakaoMapScript() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.5606707, 126.9737639), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    }; 
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    var coords = new kakao.maps.LatLng(37.5606707, 126.9737639);
    var marker = new kakao.maps.Marker({
        map: map,
        position: coords
    });

}