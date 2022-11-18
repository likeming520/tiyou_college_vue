import requestUrl from "../../requestUrl";
import request from "../../request";
import requestParam from "../../requestParam";

export function doGetMenu(param) {
  return request({
    url: requestUrl("/hyskillcoursedir/listSkillCourseDirTree"),
    method: "POST",
    data: requestParam(param)
  })
}