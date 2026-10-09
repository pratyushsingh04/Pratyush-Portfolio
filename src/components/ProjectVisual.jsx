/**
 * A project's data path as a row of nodes joined by labelled wires, with
 * packets travelling both ways. Items are { k, v } nodes or { link } wires.
 */
export default function ProjectVisual({ flow, label }) {
  return (
    <div className="arch" role="img" aria-label={label}>
      {flow.map((n, i) =>
        n.link ? (
          <div className="arch-link" key={i} aria-hidden="true">
            <span className="arch-link-l mono">{n.link}</span>
            <span className="arch-wire"><i /><i /></span>
          </div>
        ) : (
          <div className="arch-node" key={i}>
            <span className="arch-k">{n.k}</span>
            <span className="arch-v mono">{n.v}</span>
          </div>
        ),
      )}
    </div>
  )
}
