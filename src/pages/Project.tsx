import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import projects from './projects.json';
import { useParams } from 'react-router-dom';
import getIcon from '../utils/getIcon';
import {
  backhand_index_pointing_right as rightHandEmoji
} from '../assets/emojis/index';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  strawpoll_discord_bot,
  discord_bot_dashboard,
  my_portfolio
} from './projects/index';
import {
  ArrowDownTrayIcon,
  StarIcon,
  UsersIcon
} from '@heroicons/react/24/solid';
import {
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import getRepository from '../utils/getRepository';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import Theme from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    app?: string;
  }
  image: string;
  date: string;
  tags: string[];
  tools: string[];
  stats?: {
    users?: string;
    downloads?: string;
  }
}

interface Repo {
  watchers_count: number;
}

const Project: React.FC = () => {
  const [ project, setProject ] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [ repository, setRepository ] = React.useState<Repo | null>(null);

  useEffect(() => {
    if (id) {
      const project = projects.find((project) => {
        return project.title.toLowerCase().replace(/ /g, '-') === id;
      });
      if (project) {
        setProject(project);
        const projectId = project.title.toLowerCase().replace(/ /g, '-');
        if (projectId === 'coodo.xyz---discord-bot') {
          fetch(strawpoll_discord_bot).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (projectId === 'coodo.xyz---dashboard') {
          fetch(discord_bot_dashboard).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (projectId === 'my-portfolio') {
          fetch(my_portfolio).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (project.links.github) {
          getRepository(project.links.github).then((repo) => {
            setRepository(repo);
          });
        }
      }
    }
  }, []);

  console.info(repository);

  if (!project) return (
    <Layout>
      Loading....
    </Layout>
  );

  return (
    <Layout>
      <div className='flex flex-col h-full'>
        <img src={project.image} alt={project.title}
          className='w-full h-64 object-cover rounded-2xl shadow-lg' />
        <div className='flex flex-col gap-2 mt-4'>
          <div className='flex flex-row items-center flex-wrap gap-2'>
            <h1 className='font-Mbold text-3xl text-secondary-500 mr-5'>
              {project.title}
            </h1>
            {project.tags.map((tag: string, index: number) => (
              <span key={index} className='bg-secondary-500 text-tertiary-0
              font-Mmedium text-sm rounded-full px-3 py-1 h-fit bg-opacity-30
              border border-secondary-500'>
                {tag}
              </span>
            ))}
          </div>
          <div className='flex flex-row items-center gap-5'>
            <p className='font-Imedium text-tertiary-100'>
              {project.date}
            </p>
            {project.tools.length > 0 && (
              <p className='text-white'>
                •
              </p>
            )}
            <div className='flex flex-row gap-2 flex-wrap'>
              {project.tools.map((tool: string, index: number) => (
                <img
                  key={index}
                  src={getIcon(tool)}
                  alt={tool} className='w-6 h-6 inline-block rounded-sm'
                />
              ))}
            </div>
            {(project.stats?.downloads ||
            project.stats?.users ||
            repository?.watchers_count) && (
              <p className='text-white'>
                •
              </p>
            )}
            <div className='flex flex-row items-center gap-5'>
              {project.stats?.downloads && (
                <div className='flex flex-row items-center gap-1'>
                  <ArrowDownTrayIcon className='w-5 h-5 text-secondary-500' />
                  <p className='font-Mbold text-secondary-500 text-base'>
                    {project.stats.downloads}
                  </p>
                </div>
              )}
              {project.stats?.users && (
                <div className='flex flex-row items-center gap-1'>
                  <UsersIcon className='w-5 h-5 text-secondary-500' />
                  <p className='font-Mbold text-secondary-500 text-base'>
                    {project.stats.users}
                  </p>
                </div>
              )}
              {repository?.watchers_count && (
                <div className='flex flex-row items-center gap-1'>
                  <StarIcon className='w-5 h-5 text-yellow' />
                  <p className='font-Mbold text-yellow text-base'>
                    {repository.watchers_count}
                  </p>
                </div>
              )}
            </div>
          </div>
          <hr className='border-tertiary-400 my-5' />
          <div className='font-Mregular text-tertiary-100'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              children={fileContent || project.description}
              components={{
                h1(props) {
                  const {...rest} = props;
                  return <h1 className='font-Mbold text-2xl mb-2' {...rest} />;
                },
                h2(props) {
                  const {...rest} = props;
                  return <h2 className='font-Mbold text-xl mb-2' {...rest} />;
                },
                h3(props) {
                  const {...rest} = props;
                  return <h2 className='font-Mbold text-lg mb-2' {...rest} />;
                },
                a(props) {
                  const {...rest} = props;
                  return (
                    <a className='text-secondary-500 hover:underline
                    cursor-pointer'
                    {...rest} href={undefined}
                    onClick={() => {
                      window.open(props.href, '_blank');
                    }}
                    />
                  );
                },
                hr(props) {
                  const {...rest} = props;
                  return <hr className='border-secondary-500 my-5' {...rest} />;
                },
                blockquote(props) {
                  const {...rest} = props;
                  return (
                    <blockquote className='border-l-4 border-secondary-500
                    pl-3 my-2' {...rest} />
                  );
                },
                code(props) {
                  const {children, className, ...rest} = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      PreTag='div'
                      style={Theme}
                    />
                  ) : (
                    <pre {...rest} className='bg-tertiary-500
                    rounded-sm px-[2.72px] w-fit select-all inline-block'>
                      {children}
                    </pre>
                  );
                },
                li(props) {
                  const {...rest} = props;
                  return (
                    <li className='list-disc list-inside' {...rest} />
                  );
                },
                input(props) {
                  const {...rest} = props;
                  return (
                    <input className='w-4 h-4 text-secondary-500 rounded
                    bg-tertiary-500 border border-tertiary-450
                    checked:bg-tertiary-450'
                    {...rest}>
                    </input>
                  );
                },
                table(props) {
                  const {...rest} = props;
                  return (
                    <table className='table-auto border-collapse' {...rest} />
                  );
                },
                th(props) {
                  const {...rest} = props;
                  return (
                    <th className='border-tertiary-400 border-2 px-3 py-2'
                      {...rest} />
                  );
                },
                td(props) {
                  const {...rest} = props;
                  return (
                    <td className='border-tertiary-400 border-2 px-3 py-2'
                      {...rest} />
                  );
                },
                tr(props) {
                  const {...rest} = props;
                  return (
                    <tr className='border-tertiary-400 border-2 px-3 py-2'
                      {...rest} />
                  );
                },
                br(props) {
                  const {...rest} = props;
                  return (
                    <br className='my-7' {...rest} />
                  );
                },
                img(props) {
                  const {...rest} = props;
                  return (
                    <img className='w-fit h-fit
                    max-w-2xl rounded shadow-lg' {...rest} />
                  );
                },
                div(props) {
                  const {id, ...rest} = props;
                  if (id === 'note' || id === 'important' || id === 'warning') {
                    return (
                      <div className={`border-l-4 pl-3 my-2
                      ${id === 'note' && 'border-blue-500'}
                      ${id === 'important' && 'border-purple-500'}
                      ${id === 'warning' && 'border-orange-500'}`}>
                        <div className='flex flex-col gap-1'>
                          <div className='flex flex-row items-center gap-2'>
                            {id === 'note' && (
                              <InformationCircleIcon className='w-5 h-5
                              text-blue-500' />
                            )}
                            {id === 'important' && (
                              <ChatBubbleBottomCenterTextIcon className='w-5 h-5
                              text-purple-500' />
                            )}
                            {id === 'warning' && (
                              <ExclamationTriangleIcon className='w-5 h-5
                              text-orange-500' />
                            )}
                            <span className={`font-Mbold text-base
                      ${id === 'note' && 'border-blue-500 text-blue-500'}
                      ${id === 'important' && 'border-purple-500 text-purple-500'}
                      ${id === 'warning' && 'border-orange-500 text-orange-500'}`}>
                              {id === 'note' && 'Note'}
                              {id === 'important' && 'Important'}
                              {id === 'warning' && 'Warning'}
                            </span>
                          </div>
                          <p className='text-base'>
                            {props.children}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div {...rest} />
                  );
                }
              }}
            />
          </div>
          <hr className='border-tertiary-400 my-5' />
          <div className='flex flex-col gap-2'>
            {project.links.github && (
              <a onClick={() => window.open(project.links.github, '_blank')}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500 cursor-pointer'>
                <span className='bg-left-bottom bg-gradient-to-r
                from-secondary-500 to-secondary-500 bg-[length:0%_2px]
                bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
                duration-500 ease-out flex gap-2'>
                  <img src={rightHandEmoji} alt='Right Hand Emoji'
                    className='w-5 h-5 inline-block' />
                  View on GitHub
                </span>
              </a>
            )}
            {project.links.app && (
              <a onClick={() => window.open(project.links.app, '_blank')}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500 cursor-pointer'>
                <span className='bg-left-bottom bg-gradient-to-r
                from-secondary-500 to-secondary-500 bg-[length:0%_2px]
                bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
                duration-500 ease-out flex gap-2'>
                  <img src={rightHandEmoji} alt='Right Hand Emoji'
                    className='w-5 h-5 inline-block' />
                  View App
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
