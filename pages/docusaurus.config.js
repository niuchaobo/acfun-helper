// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AcFun助手',
  tagline: 'Open source, and extensible Web Browser Extension for acfun.cn.',
  url: 'https://sokwva.gitlab.io/acfun-helper',
  baseUrl: '/acfun-helper/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'niuchaobo', // Usually your GitHub org/user name.
  projectName: 'acfun-helper', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/niuchaobo/acfun-helper/edit/master/pages/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/niuchaobo/acfun-helper/tree/master/pages/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AcFun助手',
        logo: {
          alt: 'acfun-helper',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://gitlab.com/Sokwva/acfun-helper/-/tree/master/pages',
            label: 'Gitlab Pages',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'AcFun - 作者',
                href: 'https://www.acfun.cn/u/7054138',
              },
              {
                label: 'AcFun - 功能预览发布',
                href: 'https://www.acfun.cn/u/33143757',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: '主仓库',
                to: 'https://github.com/niuchaobo/acfun-helper',
              },
              {
                label: 'GitLab仓库 <Gitlab Pages>',
                to: 'https://gitlab.com/Sokwva/acfun-helper',
              },
              {
                label: '国内Gitee仓库 <version check API>',
                to: 'https://gitee.com/sokwva/acfun-helper',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
