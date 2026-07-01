import { useState, useEffect } from "react"
import { ABPlatform } from "../lib/abplatform"

const ab = new ABPlatform("http://localhost:8001", "http://localhost:8080")

function useExperiment(experimentId: string, userId: string) {
  const [variant, setVariant] = useState<string | null>(null)
  const [variantId, setVariantId] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchVariant() {
      try {
        const res = await ab.assign(experimentId, userId)
        if (res) {
          setVariant(res.variant_name)
          setVariantId(res.variant_id)
          ab.track(experimentId, res.variant_id, userId, "exposure")
        }
  } catch {
    setVariant(null)
  }
}
    fetchVariant()
  }, [experimentId, userId])

const track = (eventType: "exposure" | "conversion") => {
  if (variantId) ab.track(experimentId, variantId, userId, eventType)
}


  return { variantName: variant, variantId, track }
}

export default useExperiment
