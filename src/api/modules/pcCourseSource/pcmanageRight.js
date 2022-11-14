import requestUrl from "../../requestUrl";
import request from "../../request";
import requestParam from "../../requestParam";

export function listPageSkillQuestionsByDirId (params) {
    return request({
      url: requestUrl('/hyskillquestion/listPageSkillQuestionsByDirId'),
      method: 'post',
      data: requestParam(params)
    })
}