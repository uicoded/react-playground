export function Input(props: { name: string, desc?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="option">
      <div>
        <div className="">{props.name}</div>
        <input className="" type="number" {...props} />
      </div>
      <p>{props.desc ? `- ${props.desc}` : ''}</p>
    </label>
  );
}

export function Box({ name, className, loading, children }: { name: string; className?: string; loading: boolean, children: React.ReactNode }) {
  return (
    <div className={`box ${className}`}
    >
      <div>
        <div className="heading">
          {name}
        </div>
        <div className="loader">
          {loading && <Loader />}
        </div>
      </div>
      {children}
    </div>
  );
}
export function Loader() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
