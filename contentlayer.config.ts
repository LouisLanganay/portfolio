import {
  defineDocumentType,
  makeSource,
  defineNestedType
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';

const ButtonProperties = defineNestedType(() => ({
  name: 'ButtonProperties',
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
  },
}))

const StatProperties = defineNestedType(() => ({
  name: 'StatProperties',
  fields: {
    tooltip: {
      type: 'string',
      required: true,
    },
    value: {
      type: 'number',
      required: true,
    },
  },
}))

const StatsProperties = defineNestedType(() => ({
  name: 'StatsProperties',
  fields: {
    downloads: {
      type: 'nested',
      of: StatProperties,
    },
    users: {
      type: 'nested',
      of: StatProperties,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  contentType: 'mdx',
  filePathPattern: 'pages/**/*.mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true
    },
    author: {
      type: 'string',
      required: false,
    },
    description: {
      type: 'string',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    button: {
      type: 'nested',
      of: ButtonProperties,
    },
    repository: {
      type: 'string',
      required: false,
    },
    image: {
      type: 'string',
      required: false,
    },
    preview: {
      type: 'string',
      required: false,
    },
    video: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
    tools: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
    stats: {
      type: 'nested',
      of: StatsProperties,
    },
    index: {
      type: 'number',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project: { _raw: { flattenedPath: any; }; }) => `/content/${project._raw.flattenedPath}`
    },
    slug: {
      type: 'string',
      resolve: (doc: any) => `/${doc._raw.flattenedPath.split('/').filter(Boolean).pop()}`,
    },
  },
}))

export const Article = defineDocumentType(() => ({
  name: 'Article',
  contentType: 'mdx',
  filePathPattern: 'articles/**/*.mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true
    },
    author: {
      type: 'string',
      required: true,
    },
    newsLetter: {
      type: 'boolean',
      default: false,
    },
    image: {
      type: 'string',
      required: false,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    tools: {
      type: 'list',
      of: { type: 'string' },
    },
    repository: {
      type: 'string',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.split('/').pop()}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Article],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  disableImportAliasWarning: true,
})