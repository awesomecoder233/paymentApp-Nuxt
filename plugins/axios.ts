import https from 'https'
export default ({ $axios }: any) => {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  $axios.onRequest((config: any) => {
    config.startTime = Date.now()
    console.info('发起请求 ' + config.url)
  })

  $axios.onError((err: any) => {
    console.error(err)
  })

  $axios.onResponse((resp: any) => {
    const mill = 1000
    const costTime = (Date.now() - resp.config.startTime) / mill
    console.info(
      `请求 ${resp.config.url} 已完成！响应耗时：${costTime}s，状态码：${resp.status}`
    )
  })
}
