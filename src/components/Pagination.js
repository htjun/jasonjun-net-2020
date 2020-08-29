import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import * as style from 'styles/style'

const PaginationWrapper = styled.div`
  display: flex;
  max-width: ${style.objectSize.maxWidth};
  justify-content: center;
  margin: 64px auto 48px auto;

  @media ${style.deviceSize.mobile} {
    margin: 32px auto 24px auto;
  }

  ul {
    display: flex;
    flex-direction: row;

    li {
      color: ${style.color.grey48};
      margin-right: 12px;

      $:last-of-type {
        margin-right: 0;
      }

      & a {
        ${style.LinkStyle}

        &:hover {
          color: ${style.color.grey24};
        }

        &.active {
          color: ${style.color.grey16};
          font-weight: ${style.fontWeight.semibold};
        }
      }
    }
  }
`

const Pagination = props => {
  const context = props.context
  const { currentPage, isFirstPage, isLastPage, totalPages } = context

  const path = props.path

  const nextPage = `/${path}/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? `/${path}/` : `/${path}/${String(currentPage - 1)}`

  return totalPages > 1 ? (
    <PaginationWrapper>
      <ul>
        {!isFirstPage && (
          <li>
            <Link to={prevPage} rel="prev">
              ← Prev
            </Link>
          </li>
        )}
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <Link
                to={`/${path}/${index === 0 ? '' : index + 1}`}
                activeClassName="active"
              >
                {index + 1}
              </Link>
            </li>
          ))}
        {!isLastPage && (
          <li>
            <Link to={nextPage} rel="next">
              Next →
            </Link>
          </li>
        )}
      </ul>
    </PaginationWrapper>
  ) : null
}

export default Pagination
