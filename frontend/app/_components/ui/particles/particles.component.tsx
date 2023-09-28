"use client";

import Particles from "react-particles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";

export default function ParticlesBackground() {
  return <ParticlesContainer />;
}

function ParticlesContainer() {
  const customInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  const options = {
    preset: "links",
    zIndex: -10,
    background: {
      color: "none",
    },
    particles: {
      color: {
        value: "#000",
      },
      number: {
        value: 40,
      },
      links: {
        color: {
          value: "#000",
        },
      },
    },
  };

  return <Particles options={options} init={customInit} />;
}
