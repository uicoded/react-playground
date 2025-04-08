import { useEffect, useState } from "react";
import { Input, Box } from "./Demo.tsx";
import { useSpinDelay, defaultOptions } from "spin-delay";

export default function App() {
  // scale the default timeouts by a factor 4, to increase visibility
  const [options, setOptions] = useState({
    /**
     * Simulates the duration of a network request or data loading operation.
     * This determines how long the component stays in the loading state before automatically setting loading to false.
     * It's set to 4 times the default delay plus 100ms to ensure it's longer than the other timings.
     */
    networkTime: defaultOptions.delay * 2 + 100,

    /**
     * Controls the minimum time the loading indicator will be shown even if the actual loading completes faster.
     * This prevents flickering for very quick operations. The useSpinDelay hook will ensure the loading indicator
     * stays visible for at least this duration once it appears.
     * Default: 500
     */
    minDuration: defaultOptions.minDuration,

    /**
     * Determines how long to wait before showing any loading indicator. This prevents showing loading indicators
     * for operations that complete very quickly. The loading indicator will only appear if the operation takes
     *  longer than this delay.
     *  default: 200
     */
    delay: defaultOptions.delay
  });

  const [loading, setLoading] = useState(true);
  const [showDelayed, setShowDelayed] = useState(false);

  const showLoader = useSpinDelay(loading, options);

  useEffect(() => {
    if (!loading) return;

    const timeout = setTimeout(() => {
      setLoading(false);
      setShowDelayed(false);
    }, options.networkTime);

    return () => clearTimeout(timeout);
  }, [loading, options.networkTime]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowDelayed(true);
    }, options.delay);

    return () => clearTimeout(timeout);
  }, [loading, options.delay]);

  return (
      <div className="">
        <form
          className="settings section"
          onSubmit={(e) => {
            e.preventDefault();

            const values = Array.from(
              new FormData(e.currentTarget).entries()
            ).reduce((acc: any, [key, value]) => {
              acc[key] = parseInt(value as string, 10);
              return acc;
            }, {});

            setOptions(values);
            setLoading(true);
          }}
        >
          <Input name="networkTime" desc="How long the network takes to respond" defaultValue={options.networkTime} />
          <Input name="delay" desc="How long to wait before showing the spinner" defaultValue={options.delay} />
          <Input name="minDuration" desc="Minimum time to show the spinner" defaultValue={options.minDuration} />
          <input type="submit" value="Submit" />
        </form>

        <div className="demo">
          <Box loading={loading} name="server">
            <ul>
              <li>Shows the raw loading state (loading={"{"}loading{"}"})</li>
              <li>Represents the actual server/data loading state without any optimizations</li>
              <li>Appears immediately when loading starts and disappears as soon as loading finishes</li>
            </ul>
          </Box>
          <Box loading={showDelayed} name="delayed">
            <ul>
              <li>Shows the delayed loading state (loading={"{"}showDelayed{"}"})</li>
              <li>Only appears after the specified delay time has passed</li>
              <li>Demonstrates a simple delayed loading indicator without minimum duration</li>
            </ul>
          </Box>
          <Box loading={showLoader} name="spin-delay">
            <ul>
              <li>Uses the optimized loading state from the useSpinDelay hook (loading={"{"}showLoader{"}"})</li>
              <li>Demonstrates the combined benefits of both delay and minimum duration</li>
              <li>Only shows after the specified delay and ensures it stays visible for at least the minimum duration</li>
            </ul>
          </Box>
        </div>

      </div>
  );
}
