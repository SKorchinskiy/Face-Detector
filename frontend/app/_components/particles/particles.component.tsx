"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";

const options = {
  preset: "links",
  zIndex: -10,
  background: { color: "none" },
  particles: {
    color: { value: "#000" },
    number: { value: 40 },
    links: { color: { value: "#000" } },
  },
};

function ParticlesContainer() {
  const customInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return <Particles options={options} init={customInit} />;
}

export default function ParticlesBackground() {
  return <ParticlesContainer />;
}
