describe('Client App', () => {
    it('should define runApp function', async () => {
      const { runApp } = await import('./app');
      expect(runApp).toBeDefined();
    });
  });
  