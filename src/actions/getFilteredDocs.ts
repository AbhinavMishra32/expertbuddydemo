'use server';

import { prisma } from '@/lib/db';

type FilterParams = {
  searchQuery?: string;
  subject?: string;
  category?: string;
  minWords?: number;
  maxWords?: number;
  page?: number;
  pageSize?: number;
};

export async function getFilteredDocuments(filters: FilterParams) {
  const {
    searchQuery = '',
    subject,
    category,
    minWords = 0,
    maxWords = 1000000,
    page = 1,
    pageSize = 12,
  } = filters;

  const where = {
    AND: [
      {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { textContent: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      subject ? { subject } : {},
      category ? { category } : {},
      {
        WordCount: {
          gte: minWords,
          lte: maxWords,
        },
      },
    ],
  };

  const total = await prisma.document.count({ where });

  const docs = await prisma.document.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  return {
    total,
    docs,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}