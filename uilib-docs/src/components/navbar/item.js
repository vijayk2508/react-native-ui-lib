import React from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';
import classnames from 'classnames';

const undocumentedGroups = ['Incubator'];

export default ({id, link, components, currentPage, onLinkClick}) => {
  const hasChildren = _.size(components) > 1;

  if (!hasChildren) {
    return <ItemEntry id={id} link={link} currentPage={currentPage} onLinkClick={onLinkClick} />;
  } else {
    return (
      <li key={id}>
        {undocumentedGroups.includes(id) ? (
          <span class={classnames('entry', {selected: id === currentPage})}>{id}</span>
        ) : (
          <Link key={id} to={`/docs/${id}/`} onClick={onLinkClick}>
            <span class={classnames('entry', {selected: id === currentPage})}>{id}</span>
          </Link>
        )}

        <ul class="nested">
          {_.map(_.filter(components, c => c.node.displayName !== id), c => {
            return (
              <ItemEntry id={c.node.displayName} currentPage={currentPage} onLinkClick={onLinkClick}/>
            );
          })}
        </ul>
      </li>
    );
  }
};

const ItemEntry = ({id, link, currentPage, onLinkClick}) => {
  return (
    <li key={id}>
      <Link key={id} to={link || `/docs/${id}/`} onClick={onLinkClick}>
        <span class={classnames('entry', {selected: id === currentPage})}>
          {id}
        </span>
      </Link>
    </li>
  );
};
