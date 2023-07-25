import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {div, i, iframe, li, ol, p} = tags

  const {H1, H2, Link, VanJS} = common(doc)

  const Video = (src: string) => p({class: "video-wrapper"},
    iframe({src, frameborder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: ""}),
  )

  const Url = (url: string) => Link(url, url)

  return div({id: "content"},
    H1(VanJS(), ": Media Mentions"),
    p("🙏🙏🙏 ", VanJS(), " is a personal project, which means I don't have the time and resources to promote it to a wider audience. My heartfelt gratitude extends towards to all content creators and tech bloggers who are helping spread good words about ", VanJS(), ". Your help is invaluable in our pursuit of ", VanJS(), "'s mission: ", i("Enabling everyone to build useful UI apps with a few lines of code, anywhere, any time, on any device.")),
    H2("Videos"),
    Video("https://www.youtube.com/embed/2Oee-q5TKRU?start=1774"),
    p({class: "video-wrapper"},
      iframe({src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7069919877041410048?compact=1", height: "420", width: "100%", frameborder: "0", allowfullscreen: "", title: "Embedded post"}),
    ),
    Video("https://www.youtube.com/embed/er5er7zfMkg"),
    p("(", i("In Dutch"), ")"),
    H2("Articles / Podcasts"),
    ol(
      li(Url("https://changelog.com/jsparty/277"), " (podcasts)"),
      li(Url("https://javascriptweekly.com/issues/639")),
      li(Url("https://bytes.dev/archives/190")),
      li(Url("https://echojs.com/news/41772")),
      li(Url("https://wweb.dev/weekly/150")),
      li(Url("https://javascript.thisweekin.io/javascript-weekly-issue-83-31f1d5c6c57f")),
      li(Url("https://us3.campaign-archive.com/?u=4ad274b490aa6da8c2d29b775&id=887df01416")),
      li(Url("https://dev.to/vincenius/weekly-web-development-resources-150-5819")),
      li(Url("https://webtoolsweekly.com/archives/issue-521/")),
      li(Url("https://fully-faltoo.com/p/weekly-review-gollum/")),
      li(Url("https://unsuckjs.com/")),
      li(Url("https://enpitsulin.xlog.app/reactive-framework-less-than-100-lines"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://www.qinshenxue.com/article/vanjs-the-worlds-smallest-responsive-ui-framework.html"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://juejin.cn/post/7237702874880032826"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://juejin.cn/post/7239148708699865144"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://www.toutiao.com/article/7235535718448202301"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://zhuanlan.zhihu.com/p/633510308"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://zhuanlan.zhihu.com/p/630633744"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://www.cnblogs.com/xueweihan/p/17445043.html"), " (", i("in Simplified Chinese"), ")"),
      li(Url("https://hkdeveloper.io/2023/05/26/%E5%89%B5%E6%96%B0%E9%96%8B%E6%BA%90ui%E6%A1%86%E6%9E%B6%EF%BC%9Avanjs-%E6%96%BCgithub%E4%B8%8A%E9%87%8B%E5%87%BA/"), " (", i("in Traditional Chinese"), ")"),
      li(Url("https://zenn.dev/daifukuninja/articles/79ff6fa650a535"), " (", i("in Japanese"), ")"),
      li(Url("http://kachibito.net/useful-resource/vanjs"), " (", i("in Japanese"), ")"),
      li(Url("https://b.hatena.ne.jp/entry/s/github.com/vanjs-org/van"), " (", i("in Japanese"), ")"),
      li(Url("https://stackshare.io/vanjs")),
      li(Url("https://www.libhunt.com/r/van")),
      li(Url("https://www.saashub.com/vanjs")),
      li(Url("https://kicksaas.cool/resource/vanjs")),
      li(Url("https://www.builtatlightspeed.com/theme/vanjs-org-mini-van")),
    ),
  )
}
