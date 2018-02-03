const api = 'http://cryptoportfolio.projects.oktend.com';

export const apiData = {
  listCoins: `${api}/coins/`,
  auth: `${api}/api-token-auth/`,
  github: `${api}/data/github`,
  reddit: `${api}/data/reddit`,
  twitter: `${api}/data/twitter`,
  telegram: `${api}/data/telegram`,
  googleSearch: `${api}/data/googlesearch`,
  cryptoid: `${api}/data/cryptoid`,
  bitcoinTalk: `${api}/data/bitcointalk`,
}

export function callApi(api) {
  console.log('callapi')
  return api
    .then(response => {
        return response.json().then((json) => {
            return {json, response}
          }
        )
      }
    ).then(({json, response}) => {
      //response.status = 400
      if (response.status !== 200) {
        return Promise.reject(response)
      }
      return json
    })
    .then(
      json => {
        return json
      },
      error => {
        return {error: error.message || 'Возникла ошибка'}
      }
    )
}
