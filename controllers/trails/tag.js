/**
 * ex) http://localhost:3000/trails/:tag
 * myPage 접속 후 태그를 클릭할 때마다 보내는 요청.
 * 필요한 데이터: token(decoded)으로 인증, userId(req.cookie(s).id 로 가져온다), req.params.tag
 * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
 * 2. 토큰이 있다면 req.cookie(s) 를 통해 userId 를 받는다.
 * 3. req.params.tag === tag에 일치하는 trail의
 *  locations 데이터, username(작성자), title, (tag) (,rating) 를 응답으로 보낸다.
 * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
 * ㄴ 형식:
 * {
 *   trailId: 1,
 *   location1: (x, y),
 *   location2: (x, y),
 *   location3: (x, y),
 *   location4: (x, y),
 *   location5: (x, y),
 *   username: 'user1',
 *   title: 'good trail',
 *   (tag: 'night view',) - 생략가능? 추후논의 - 선택한 리스트 제목
 *   (rating: 5, 한 trail 의 정보창에 있는게 나을수도..)
 * }
 * 보낸 데이터들을 front 에서 현재 위치기준으로 반경 ~km 이내(location1을 기준)만 나타내도록 filter
 */
module.exports = (req, res) => {
  res.send(req.params.tag);
};
