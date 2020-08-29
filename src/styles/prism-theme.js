var theme /*: PrismTheme */ = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'hsl(228, 12%, 16%)',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(255, 238, 128)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(110, 116, 125)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(180, 110, 255)',
      },
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(255, 98, 140)',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(128, 255, 64)',
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: 'rgb(255, 98, 140)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(255, 201, 139)',
      },
    },
    {
      types: [
        'keyword',
        'operator',
        'property',
        'namespace',
        'tag',
        'selector',
        'doctype',
        'variable',
      ],
      style: {
        color: 'rgb(255, 100, 140)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'class-name'],
      style: {
        color: 'rgb(255, 201, 139)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(65,184,255)',
      },
    },
  ],
}

module.exports = theme
