import React from 'react'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionsSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionsSize = 10}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i);
    }

    const portionsCount = Math.ceil(pagesCount / portionsSize);
    const [portionNumber, setPortionNumber] = React.useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionsSize + 1;
    const rightPortionPageNumber = portionNumber * portionsSize;

    return (
      <div>
          {portionNumber > 1 &&
          <button onClick={() => setPortionNumber(portionNumber - 1)}>BACK</button>}

          {
              pages.filter(page => (page >= leftPortionPageNumber && page <= rightPortionPageNumber))
                  .map(page => {
                      return <span key={page} onClick={el => onPageChanged(page)}>
                          {page}
                      </span>
                  })
          }

          {portionsCount > portionNumber &&
          <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
      </div>
    );
};

export default Paginator;