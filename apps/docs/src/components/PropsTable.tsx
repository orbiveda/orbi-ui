interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  data: PropDef[];
}

export function PropsTable({ data }: PropsTableProps) {
  return (
    <div className="docs-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name}>
              <td className="prop-name">{prop.name}</td>
              <td className="prop-type">{prop.type}</td>
              <td className="prop-default">{prop.default ?? "—"}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
