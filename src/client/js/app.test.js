describe('Client App', () => {
  it('should define performSearch function', async () => {
      const { performSearch } = await import('./app');
      expect(performSearch).toBeDefined();
  });
});