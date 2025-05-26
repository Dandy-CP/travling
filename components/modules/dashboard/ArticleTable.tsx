import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { DeleteArticle } from '@/service/api/article/article.mutation';
import { ArticleType } from '@/types/article.types';

interface Props {
  articleData: ArticleType[];
  pageCount: number;
  currentPage: number;
  isFetching: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
}

const ArticleTable = ({
  articleData,
  pageCount,
  currentPage,
  isFetching,
  setCurrentPage,
  refetch,
}: Props) => {
  const { mutateAsync, isPending } = DeleteArticle({
    onSuccess() {
      toast.success('Success Delete Article');
      refetch();
    },
    onError(error) {
      toast.error(
        `Error on delete Article: ${error.response.data.error.message}`
      );
    },
  });

  const publishedDate = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const monthName = date.toLocaleString('id-ID', { month: 'long' });
    const publishedDate = `${date.getDate()} ${monthName}, ${date.getFullYear()}`;

    return publishedDate;
  };

  const handleDeleteArticle = (documentID: string) => {
    mutateAsync({
      documentID: documentID,
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!isFetching &&
            articleData.map((value) => (
              <TableRow key={value.id}>
                <TableCell width={300}>
                  <p className="truncate w-[300px]">{value.title}</p>
                </TableCell>

                <TableCell width={300}>
                  <p className="truncate w-[300px]">{value.description}</p>
                </TableCell>

                <TableCell>{value.user.username}</TableCell>

                <TableCell>{publishedDate(value.publishedAt)}</TableCell>

                <TableCell>
                  <div className="flex flex-row gap-3">
                    <Link
                      href={`/dashboard/article?edit=true&id=${value.documentId}`}
                    >
                      <Button variant="secondary" disabled={isPending}>
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      disabled={isPending}
                      onClick={() => {
                        handleDeleteArticle(value.documentId);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {isFetching && (
            <>
              {Array(10)
                .fill(10)
                .map((_, index) => (
                  <TableRow key={index}>
                    {Array(5)
                      .fill(5)
                      .map((_, index) => (
                        <TableCell key={index}>
                          <div className="bg-gray-200 w-1/2 h-[20px] rounded-md" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev));
              }}
            />
          </PaginationItem>

          {Array(pageCount)
            .fill(pageCount)
            .map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === currentPage}
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage((prev) =>
                  prev !== pageCount ? prev + 1 : prev
                );
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ArticleTable;
