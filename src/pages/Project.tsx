import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import projects from './projects/projects.json';
import { useParams } from 'react-router-dom';
import getIcon from '../utils/getIcon';
import {
  backhand_index_pointing_right as rightHandEmoji,
  hourglass_not_done as hourglassEmoji
} from '../assets/emojis/index';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  strawpoll_discord_bot,
  discord_bot_dashboard,
  my_portfolio,
  api,
  zombie_quarter_rampage,
  commit_ai_generator
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
import { Project, Repository } from '../utils/types';

const ProjectPage: React.FC = () => {
  const [ project, setProject ] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [ repository, setRepository ] = useState<Repository | null>(null);

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
        if (projectId === 'coodo.xyz---api') {
          fetch(api).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (projectId === 'zombie-quarter-rampage') {
          fetch(zombie_quarter_rampage).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (projectId === 'commit-ai-generator') {
          fetch(commit_ai_generator).then((res) => res.text())
            .then((text) => setFileContent(text));
        }
        if (project.repository) {
          getRepository(project.repository).then((repo) => {
            setRepository(repo);
          });
        }
      }
    }
  }, []);

  console.info(repository);

  if (!project) return (
    <Layout>
      <h4 className='font-Mbold text-2xl text-tertiary-100'>
        Loading....
      </h4>
    </Layout>
  );

  return (
    <Layout>
      <div className='flex flex-col h-full'>
        {project.image ? (
          <img src={project.image} alt={project.title}
            className='w-full h-64 object-cover rounded-2xl shadow-lg' />
        ) : (
          <div className='w-full h-64 rounded-2xl shadow-lg flex flex-row
          items-center justify-center'>
            <h2 className='font-Iregular text-tertiary-100 text-lg
            flex justify-center items-center h-full'>
              Nothing here yet!
            </h2>
            <img src={hourglassEmoji} alt='Hourglass Emoji'
              className='w-7 h-7 inline-block ml-2' />
          </div>
        )}
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
              <p className='text-tertiary-100'>
                •
              </p>
            )}
            <div className='flex flex-row gap-2 flex-wrap'>
              {project.tools.sort().map((tool: string, index: number) => (
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
              <p className='text-tertiary-100'>
                •
              </p>
            )}
            <div className='flex flex-row items-center gap-5'>
              {project.stats?.downloads && (
                <div className='flex flex-row items-center gap-1'>
                  <ArrowDownTrayIcon className='w-5 h-5 text-secondary-500' />
                  <p className='font-Mbold text-secondary-500 text-base'>
                    {project.stats.downloads.value}
                  </p>
                </div>
              )}
              {project.stats?.users && (
                <div className='flex flex-row items-center gap-1'>
                  <UsersIcon className='w-5 h-5 text-secondary-500' />
                  <p className='font-Mbold text-secondary-500 text-base'>
                    {project.stats.users.value}
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
                    {...rest} href={props.href}
                    target='_blank' rel='noreferrer' />
                  );
                },
                hr(props) {
                  const {...rest} = props;
                  return <hr className='border-secondary-500 my-5' {...rest} />;
                },
                blockquote(props) {
                  const {children, ...rest} = props;
                  console.info(props.node.children[1].type);
                  if (props.node.children[1].type === 'element') {
                    const value = (props.node.children[1].children[0] as {
                      value: string
                    }).value;
                    const content = (children[1] as {
                      props: {
                        children: string
                      }
                    }).props.children;
                    const contentArray = content.slice(1);
                    console.info(contentArray);
                    console.info(value);
                    if (value.startsWith('[!NOTE]')) {
                      return (
                        <blockquote className='border-l-4 border-secondary-500
                        pl-3 my-2 flex flex-col gap-1' {...rest}>
                          <div className='flex flex-row items-center gap-2'>
                            <InformationCircleIcon className='w-5 h-5
                          text-secondary-500' />
                            <span className='font-Mbold text-base
                          border-secondary-500 text-secondary-500'>
                              Note
                            </span>
                          </div>
                          <p className='text-base'>
                            {content[0].slice(7)}
                            {contentArray}
                          </p>
                        </blockquote>
                      );
                    }
                    if (value.startsWith('[!IMPORTANT]')) {
                      return (
                        <blockquote className='border-l-4 border-purple-500
                        pl-3 my-2 flex flex-col gap-1' {...rest}>
                          <div className='flex flex-row items-center gap-2'>
                            <ChatBubbleBottomCenterTextIcon className='w-5 h-5
                          text-purple-500' />
                            <span className='font-Mbold text-base
                          border-purple-500 text-purple-500'>
                              Important
                            </span>
                          </div>
                          <p className='text-base'>
                            {value.slice(13)}
                          </p>
                        </blockquote>
                      );
                    }
                    if (value.startsWith('[!WARNING]')) {
                      return (
                        <blockquote className='border-l-4 border-main-500
                        pl-3 my-2 flex flex-col gap-1' {...rest}>
                          <div className='flex flex-row items-center gap-2'>
                            <ExclamationTriangleIcon className='w-5 h-5
                          text-main-500' />
                            <span className='font-Mbold text-base
                          border-main-500 text-main-500'>
                              Warning
                            </span>
                          </div>
                          <p className='text-base'>
                            {value.slice(11)}
                          </p>
                        </blockquote>
                      );
                    }
                    return (
                      <blockquote className='border-l-4 border-green-500
                      pl-3 my-2 flex flex-col gap-1' {...rest}>
                        <p className='text-base'>
                          {value}
                        </p>
                      </blockquote>
                    );
                  }
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
                    <div className='w-full h-full'>
                      <img className='w-full h-full rounded' {...rest} />
                    </div>
                  );
                }
              }}
            />
          </div>
          <hr className='border-tertiary-400 my-5' />
          <div className='flex flex-col gap-2'>
            {project.repository && (
              <a href={project.repository} target='_blank' rel='noreferrer'
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
            {project.links?.map((link) => (
              <a href={link.url} target='_blank' rel='noreferrer'
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500 cursor-pointer'>
                <span className='bg-left-bottom bg-gradient-to-r
                from-secondary-500 to-secondary-500 bg-[length:0%_2px]
                bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
                duration-500 ease-out flex gap-2'>
                  <img src={rightHandEmoji} alt='Right Hand Emoji'
                    className='w-5 h-5 inline-block' />
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectPage;
