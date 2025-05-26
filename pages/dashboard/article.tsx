import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  CreateArticle,
  EditArticle,
} from '@/service/api/article/article.mutation';
import { GetCategory } from '@/service/api/category/category.query';
import { UploadImage } from '@/service/api/upload.mutation';
import { GetArticlesDetail } from '@/service/api/article/article.query';
import { ArticleSchema } from '@/schema/article.schema';
import { ArticleBody, EditArticleBody } from '@/types/article.types';

const ArticlePage = () => {
  const [uploadedURL, setUploadedURL] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const router = useRouter();
  const isEditQuery = router.query.edit === 'true' ? true : false;
  const documentIdQuery = router.query.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<ArticleBody>({
    resolver: zodResolver(ArticleSchema),
  });

  const { data: articleDetail } = GetArticlesDetail(
    { id: documentIdQuery, 'populate[category]': '*' },
    {
      queryKey: [documentIdQuery],
      enabled: documentIdQuery !== undefined,
    }
  );
  const article = articleDetail?.data;

  const { data: categoryData } = GetCategory();
  const categoryList = categoryData?.data ?? [];

  const { mutateAsync: requestCreateArticle, isPending: isCreatePending } =
    CreateArticle({
      onSuccess() {
        toast.success('Success Create Article');
        reset();
        setPreviewImage('');
      },
      onError(error) {
        toast.error(
          `Error On Create Article: ${error.response.data.error.message}`
        );
      },
    });

  const { mutateAsync: requestEditArticle, isPending: isEditPending } =
    EditArticle({
      onSuccess() {
        toast.success('Success Edit Article');
        router.push('/dashboard');
      },
      onError(error) {
        toast.error(
          `Error On Edit Article: ${error.response.data.error.message}`
        );
      },
    });

  const { mutateAsync: requestUpload, isPending: isPendingUpload } =
    UploadImage({
      onSuccess(data) {
        toast.success('Success Upload Image');
        setUploadedURL(data[0].url);
      },
      onError(error) {
        toast.error(
          `Error On Upload Image: ${error.response.data.error.message}`
        );
      },
    });

  const handleOnFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.item(0);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

    requestUpload({
      files: file as File,
    });
  };

  const onSubmit: SubmitHandler<ArticleBody> = (data) => {
    if (isEditQuery) {
      const payload: EditArticleBody = {
        documentID: documentIdQuery as string,
        title: data.title,
        description: data.description,
        cover_image_url: !previewImage ? article?.cover_image_url : uploadedURL,
        category: Number(data.category),
      };

      requestEditArticle(payload);
    }

    if (!isEditQuery) {
      const payload: ArticleBody = {
        title: data.title,
        description: data.description,
        cover_image_url: uploadedURL,
        category: Number(data.category),
      };

      requestCreateArticle(payload);
    }
  };

  useEffect(() => {
    if (isEditQuery && article) {
      setValue('title', article?.title);
      setValue('description', article?.description);
      setValue('category', String(article?.category?.id));
      setValue('cover_image_url', article.cover_image_url);
    }

    if (!isEditQuery) {
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, isEditQuery]);

  return (
    <div>
      <h1 className="font-bold text-2xl">
        {isEditQuery ? 'Edit' : 'Create'} Article
      </h1>

      <hr className="my-5" />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          placeholder="Article Title"
          errorMessage={errors.title?.message}
          {...register('title')}
        />

        <Input
          label="Description"
          placeholder="Article Description"
          variant="textarea"
          rows={5}
          errorMessage={errors.description?.message}
          {...register('description')}
        />

        <div>
          <label
            htmlFor="category"
            className="font-medium text-sm mb-2 text-[#0A0A0A]"
          >
            Category Article
          </label>

          <select
            className="bg-white border border-gray-300 shadow text-sm rounded-md block w-full p-2.5"
            {...register('category')}
          >
            <option value="">Select Category Article</option>

            {categoryList.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <span className="font-medium text-sm text-red-400">
              {errors.category?.message}
            </span>
          )}
        </div>

        {previewImage ? (
          <Image
            src={previewImage as string}
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
        ) : article?.cover_image_url ? (
          <Image
            src={article?.cover_image_url ?? '/PNG/broken-image.png'}
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
        ) : null}

        {isPendingUpload && (
          <p className="text-md font-bold text-center">Uploading Image</p>
        )}

        <Controller
          name="cover_image_url"
          control={control}
          render={({ field: { ref, name, onBlur, onChange } }) => {
            return (
              <Input
                label="Cover Image"
                type="file"
                ref={ref}
                accept="image/*"
                name={name}
                onBlur={onBlur}
                disabled={isPendingUpload}
                errorMessage={errors.cover_image_url?.message}
                onChange={(event: any) => {
                  const file = event.target.files?.[0];
                  onChange(file);
                  handleOnFileChange(event);
                }}
              />
            );
          }}
        />

        <Button
          type="submit"
          disabled={isCreatePending || isEditPending || isPendingUpload}
        >
          {isEditQuery ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default ArticlePage;
