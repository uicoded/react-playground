import { Suspense, useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";
import styles from './App_hooks-use-optimistic-form.module.css';

type ShippingItem = {
  name: string;
  description: string;
  weight: number;
  carrier: "usps" | "ups" | "fedex";
  status?: string;
};

function ShipButton() {
  // This actualy wont be needed because we use optimistic updates immediately
  const { pending, data } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? `Shipping ${data?.get("name") || ""}` : "Ship"}
    </button>
  );
}

function ShipmentForm({ shipment, action }: { shipment: ShippingItem | null; action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className={styles.shipmentForm}>
      <label>
        Name:
        <input type="text" name="name" defaultValue={shipment?.name} />
      </label>
      <label>
        Description:
        <input type="text" name="description" defaultValue={shipment?.description} />
      </label>
      <label>
        Weight:
        <select name="weight" defaultValue={shipment?.weight}>
          <option value="0">Less than 1 pound</option>
          <option value="1">1-2 pounds</option>
          <option value="3">3-5 pounds</option>
          <option value="5">5+ pounds</option>
        </select>
      </label>
      <label>
        Carrier:
        <select name="carrier" defaultValue={shipment?.carrier}>
          <option value="usps">USPS</option>
          <option value="ups">UPS</option>
          <option value="fedex">FedEx</option>
        </select>
      </label>
      <ShipButton />
    </form>
  );
}

function ShipmentLabel(props: ShippingItem) {
  return (
    <div className={styles.shipmentLabel}>
      <h3>Shipping Label</h3>
      <div className={styles.shipmentLabelContent}>
        <p>
          <strong>Name:</strong> {props.name}
        </p>
        <p>
          <strong>Description:</strong> {props.description}
        </p>
        <p>
          <strong>Weight:</strong> {props.weight} lbs
        </p>
        <p>
          <strong>Carrier:</strong> {props.carrier}
        </p>
        <p>
          <strong>Status:</strong> {props.status || "Processing"}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [shipment, setShipment] = useState<ShippingItem | null>(null);

  // Create optimistic state that will immediately show a "pending" shipment
  // while the actual shipment is being processed
  const [optimisticShipment, addOptimisticShipment] = useOptimistic(
    shipment,
    (_, formData: FormData) => {
      // Create an optimistic version of the shipment from form data
      return {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        weight: Number(formData.get("weight")),
        carrier: formData.get("carrier") as "usps" | "ups" | "fedex",
        status: "Pending..." // Optimistic status
      };
    }
  );

  // Shipping action with delay
  async function shipAction(formData: FormData): Promise<void> {
    // Show optimistic UI immediately
    addOptimisticShipment(formData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const weight = Number(formData.get("weight"));
    const carrier = formData.get("carrier") as "usps" | "ups" | "fedex";

    const newShipment: ShippingItem = {
      name,
      description,
      weight,
      carrier,
      status: "Shipped"
    };

    // Update the actual state after the "API call" completes
    setShipment(newShipment);
  }

  // Check if the shipment is in pending state
  const isShipmentPending = optimisticShipment?.status === "Pending...";

  return (
    <div className="shiping-app">
      <h1>Shipping with useOptimistic</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {optimisticShipment ? (
          <>
            <ShipmentLabel {...optimisticShipment} />
            <button
              onClick={() => setShipment(null)}
              style={{ marginTop: '20px' }}
              disabled={isShipmentPending}
            >
              {isShipmentPending ? 'Processing Shipment...' : 'Create New Shipment'}
            </button>
          </>
        ) : (
          <ShipmentForm action={shipAction} shipment={null} />
        )}
      </Suspense>
    </div>
  );
}
