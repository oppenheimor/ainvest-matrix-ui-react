import * as React from 'react';
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/shadcn-pagination';
import { usePagination, DOTS } from './hooks/use-pagination';

export interface PaginationProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'>,
    Partial<{
      total: number;
      page: number;
      siblings: number;
      boundaries: number;
      onChange: (page: number) => void;
    }> {}

export const Pagination = ({
  total = 1,
  page = 1,
  siblings,
  boundaries,
  onChange,
  ...props
}: PaginationProps) => {
  const paginationRange = usePagination({ totalPage: total, page, siblings, boundaries });

  const onNext = () => {
    if (page < total) {
      onChange?.(page + 1);
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      onChange?.(page - 1);
    }
  };

  return (
    <PaginationContainer {...props}>
      <PaginationContent key={`${page}-${total}-${siblings}-${boundaries}`}>
        <PaginationItem className="mr-3">
          <PaginationPrevious onClick={onPrevious} disabled={page === 1} />
        </PaginationItem>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={DOTS + index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => onChange?.(pageNumber as number)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem className="ml-3">
          <PaginationNext onClick={onNext} disabled={page === total} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};