import { useRef, useEffect } from "react"
import { useKey, useClickAway } from "react-use"

type OverlayProps = {
  show: boolean
  children: React.ReactNode
  onClose?: () => void
}

export default function Overlay({ show, children, onClose }: OverlayProps) {
  const overlayContentRef = useRef(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useKey('Escape', () => onClose?.());
  useClickAway(overlayContentRef, () => onClose?.());

  // Set focus on the close button when the overlay opens
  useEffect(() => {
    if (show && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={overlayContentRef}
        style={{
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px',
          maxWidth: '600px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          style={{
            position: 'absolute',
            display: 'block',
            top: '10px',
            right: '10px',
            background: 'white',
            color: 'black',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            padding: 0
          }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
