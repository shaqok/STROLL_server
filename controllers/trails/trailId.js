/**
 * ex) http://localhost:3000/trails/:tag/:trailId
 * myPage 에서 태그를 선택한 후, 한가지 산책로를 선택했을 때 보내는 요청.
 * 필요한 데이터: token(decoded)으로 인증, userId(req.cookie(s).id 로 가져온다),
 * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
 * 2. 토큰이 있다면 req.cookie(s) 를 통해 userId 를 받는다.
 * 3. trailId 에 따른 locations 데이터, username(작성자), title, tag (,rating) 를 응답으로 보낸다.
 * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
 * ㄴ 형식:
 * {
 *   trailId: 1,
 *   location1: (x, y),
 *   location2: (x, y),
 *   location3: (x, y),
 *   location4: (x, y),
 *   location5: (x, y),
 *   username(작성자): 'user1',
 *   title: 'good trail',
 *   review: 'favorite trail',
 *   comment, rating, username(댓글), image:
 *         Comments.findAll({where: trailId:trailId} + username, Images),
 *   tag: 'night view',
 * }
 * 보낸 데이터들을 front 에서 현재 위치기준으로 반경 ~km 이내(location1을 기준)만 나타내도록 filter
 */
module.exports = (req, res) => {
  res.send(req.params.trailId);
};
