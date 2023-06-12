const {article, h1, p} = van.tags

const Blog = () => [
  Post({title: "An update", body: "It's been a while since I posted..."}),
  Post({title: "My new blog", body: "I am starting a new blog!"}),
]

const Post = ({title, body}) => [
  PostTitle({title}),
  PostBody({body}),
]

const PostTitle = ({title}) => h1(title)
const PostBody = ({body}) => article(p(body))

van.add(document.body, Blog())
