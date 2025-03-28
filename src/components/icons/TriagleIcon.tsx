type TriangleIconProps = {
  className?: string;
}

const TriangleIcon = ({ className }: TriangleIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default TriangleIcon;