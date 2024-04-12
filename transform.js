export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  return root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'console' },
      property: { type: 'Identifier', name: 'log' }
    }
  })
    .replaceWith(p => j.commentBlock(` ${p.value.loc.start.line}:${p.value.loc.start.column} console.log removed `, false, true))
    .toSource()
}
