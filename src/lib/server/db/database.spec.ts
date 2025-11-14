import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Category } from './schema';

vi.mock('$lib/server/db', () => {
        let categoriesResult: Category[] = [];
        let randomResult: Array<{ text: string }> = [];

        const categoriesChain = {
                from: vi.fn(() => categoriesChain),
                orderBy: vi.fn(() => Promise.resolve(categoriesResult))
        };

        const randomPhraseChain = {
                from: vi.fn(() => randomPhraseChain),
                where: vi.fn(() => randomPhraseChain),
                orderBy: vi.fn(() => randomPhraseChain),
                limit: vi.fn(() => Promise.resolve(randomResult))
        };

        const selectMock = vi.fn((selection?: unknown) => {
                if (selection && typeof selection === 'object' && 'text' in (selection as Record<string, unknown>)) {
                        return randomPhraseChain;
                }
                return categoriesChain;
        });

        return {
                db: {
                        select: selectMock
                },
                __mock: {
                        setCategoriesResult: (value: Category[]) => {
                                categoriesResult = value;
                        },
                        setRandomResult: (value: Array<{ text: string }>) => {
                                randomResult = value;
                        },
                        reset: () => {
                                categoriesResult = [];
                                randomResult = [];
                                categoriesChain.from.mockClear();
                                categoriesChain.orderBy.mockClear();
                                randomPhraseChain.from.mockClear();
                                randomPhraseChain.where.mockClear();
                                randomPhraseChain.orderBy.mockClear();
                                randomPhraseChain.limit.mockClear();
                                selectMock.mockClear();
                        }
                }
        };
});

const mockControlsPromise = import('$lib/server/db').then((module) => (module as unknown as { __mock: MockControls }).__mock);

import { getCategories, getRandomPhrase } from './database';

type MockControls = {
        setCategoriesResult: (value: Category[]) => void;
        setRandomResult: (value: Array<{ text: string }>) => void;
        reset: () => void;
};

describe('database helpers', () => {
        let controls: MockControls;

        beforeEach(async () => {
                controls = await mockControlsPromise;
                controls.reset();
        });

        describe('getCategories', () => {
                it('returns categories provided by the database layer', async () => {
                        const sampleCategories: Category[] = [
                                { id: 'motivacao', name: 'Motivação' },
                                { id: 'produtividade', name: 'Produtividade' }
                        ];
                        controls.setCategoriesResult(sampleCategories);

                        const result = await getCategories();

                        expect(result).toEqual(sampleCategories);
                });
        });

        describe('getRandomPhrase', () => {
                it('returns the phrase text when the query yields a result', async () => {
                        controls.setRandomResult([{ text: 'Acredite em você mesmo.' }]);

                        const phrase = await getRandomPhrase('motivacao');

                        expect(phrase).toBe('Acredite em você mesmo.');
                });

                it('falls back to a friendly message when no phrases are available', async () => {
                        controls.setRandomResult([]);

                        const phrase = await getRandomPhrase('categoria-inexistente');

                        expect(phrase).toBe('Nenhuma frase disponível para esta categoria.');
                });
        });
});
