import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tocbot from "tocbot";

const Nav = styled.nav.attrs({ className: "sbdocs sbdocs-toc" })`
  --color: var(--toc-color, inherit);
  --background: var(--toc-background, none);
  --indicator-color: var(--toc-indicator-color, #f5f5f5);
  --indicator-color--active: var(--toc-indicator-color--active, #0675c1);

  position: fixed;
  top: 40px;
  left: calc(50% + 500px + 20px);
  padding: 10px;
  width: 250px;
  background: var(--background);
  z-index: 9999;
  transition: all 0.3s ease-in;

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-link {
    color: var(--color);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .toc-list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 10px;
    cursor: pointer;

    &:before {
      position: absolute;
      content: " ";
      display: inline-block;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background: var(--indicator-color);
    }

    &.is-active-li {
      color: var(--indicator-color--active);

      &:before {
        background: var(--indicator-color--active);
      }
    }

    .toc-list-item {
      opacity: 0.54;

      &:before {
        content: none;
      }
    }
  }
`;

const NavHeader = styled.header.attrs({
  className: "sbdocs sbdocs-toc__header",
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

const configuration = {
  tocSelector: ".js-toc",
  contentSelector: ".sbdocs-content",
  headingSelector: ".sbdocs-h2",
};

const TableOfContents: FunctionComponent = ({ title, children, ...rest }) => {
  const [headings, setHeadings] = React.useState([]);

  React.useEffect(() => {
    const h2 = [...document.getElementsByClassName("sbdocs-h2")];

    if (h2.length > 1) {
      // @ts-ignore
      setHeadings(h2);

      tocbot.init({
        ...configuration,
        onClick: (event) => {
          event.preventDefault();
          // @ts-ignore
          const hash = event?.currentTarget.hash;
          const id = hash?.substr(1);
          const element = document.getElementById(id);
          setTimeout(() => {
            element?.focus();
            element?.scrollIntoView();
          }, 500);
        },
      });

      return () => {
        tocbot.destroy();
      };
    }
  }, []);

  return (
    <Nav style={{ display: headings.length > 1 ? "block" : "none" }} {...rest}>
      <NavHeader>{title || "Table of contents"}</NavHeader>
      <div className="js-toc"></div>
      {children}
    </Nav>
  );
};

export default TableOfContents;
