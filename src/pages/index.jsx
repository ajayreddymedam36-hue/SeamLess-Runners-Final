import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { QUESTIONS, SUBJECTS, DIFFICULTIES } from "@/game/questions";

const LANES = [-2, 0, 2];

export default function Index() {
  const mountRef = useRef(null);
  const stateRef = useRef({
    phase: "menu",
    lane: 1,
    targetX: 0,
    yVel: 0,
    y: 0,
    sliding: false,
    slideTimer: 0,
    speed: 0.25,
    score: 0,
    coins: 0,
    distance: 0,
  });

  const [phase, setPhase] = useState("menu");
  const [subject, setSubject] = useState("javascript");
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [speedLabel, setSpeedLabel] = useState("CRUISING");
  const [currentMCQ, setCurrentMCQ] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const pickQuestion = useCallback(() => {
    const pool = QUESTIONS[subject][difficulty];
    return pool[Math.floor(Math.random() * pool.length)];
  }, [subject, difficulty]);

  const startGame = () => {
    stateRef.current = {
      phase: "playing",
      lane: 1,
      targetX: 0,
      yVel: 0,
      y: 0,
      sliding: false,
      slideTimer: 0,
      speed: 0.25,
      score: 0,
      coins: 0,
      distance: 0,
    };
    setScore(0);
    setCoins(0);
    setSpeedLabel("CRUISING");
    setPhase("playing");
  };

  const onAnswerSelect = (opt) => {
    if (selectedAnswer || !currentMCQ) return;
    setSelectedAnswer(opt);
    setTimeout(() => {
      if (opt === currentMCQ.answer) {
        setCurrentMCQ(null);
        setSelectedAnswer(null);
        stateRef.current.phase = "playing";
        setPhase("playing");
      } else {
        setCurrentMCQ(null);
        setSelectedAnswer(null);
        stateRef.current.phase = "gameover";
        setPhase("gameover");
      }
    }, 900);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9fd9f6);
    scene.fog = new THREE.Fog(0x9fd9f6, 25, 70);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 5, 9);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x88aa66, 0.7);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(8, 15, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    scene.add(sun);

    const grass = new THREE.Mesh(new THREE.PlaneGeometry(80, 400), new THREE.MeshLambertMaterial({ color: 0x6cc36a }));
    grass.rotation.x = -Math.PI / 2;
    grass.position.z = -150;
    grass.receiveShadow = true;
    scene.add(grass);

    const track = new THREE.Mesh(new THREE.PlaneGeometry(7, 400), new THREE.MeshLambertMaterial({ color: 0xd9c39a }));
    track.rotation.x = -Math.PI / 2;
    track.position.set(0, 0.01, -150);
    track.receiveShadow = true;
    scene.add(track);

    for (const x of [-1, 1]) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 400), new THREE.MeshBasicMaterial({ color: 0xc2a978 }));
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.02, -150);
      scene.add(line);
    }

    const wallMat = new THREE.MeshLambertMaterial({ color: 0xc94d3a });
    for (const x of [-3.8, 3.8]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 400), wallMat);
      wall.position.set(x, 0.3, -150);
      wall.castShadow = true;
      scene.add(wall);
    }

    const mountainMat = new THREE.MeshLambertMaterial({ color: 0x7a8aa8, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(6 + Math.random() * 4, 8 + Math.random() * 4, 4), mountainMat);
      m.position.set(-25 + (i % 2 === 0 ? -10 : 10), 3, -30 - i * 18);
      m.rotation.y = Math.random() * Math.PI;
      scene.add(m);
    }

    const treeTrunkMat = new THREE.MeshLambertMaterial({ color: 0x6b4a2b });
    const treeLeafMat = new THREE.MeshLambertMaterial({ color: 0x2e7d3f, flatShading: true });
    const trees = [];
    const TREE_COUNT = 30;
    for (let i = 0; i < TREE_COUNT; i++) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.2, 6), treeTrunkMat);
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      g.add(trunk);
      const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2, 6), treeLeafMat);
      leaves.position.y = 2;
      leaves.castShadow = true;
      g.add(leaves);
      const side = i % 2 === 0 ? -1 : 1;
      g.position.set(side * (5 + Math.random() * 2), 0, -i * 6 - Math.random() * 4);
      scene.add(g);
      trees.push(g);
    }

    const player = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.6), new THREE.MeshLambertMaterial({ color: 0x3b82f6 }));
    body.position.y = 0.55;
    body.castShadow = true;
    player.add(body);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), new THREE.MeshLambertMaterial({ color: 0xffd9b3 }));
    head.position.y = 1.4;
    head.castShadow = true;
    player.add(head);
    player.position.set(0, 0, 4);
    scene.add(player);

    const obstacles = [];
    const coinObjs = [];
    const obsBoxMat = new THREE.MeshLambertMaterial({ color: 0xd23b3b });
    const obsBarrierMat = new THREE.MeshLambertMaterial({ color: 0x9b59cf });
    const coinMat = new THREE.MeshLambertMaterial({ color: 0xf6c12c, emissive: 0x442e00 });

    const spawnObstacle = (z) => {
      const lane = Math.floor(Math.random() * 3);
      const isBarrier = Math.random() < 0.3;
      const geo = isBarrier ? new THREE.BoxGeometry(1.5, 1.6, 0.3) : new THREE.BoxGeometry(0.9, 0.9, 0.9);
      const mesh = new THREE.Mesh(geo, isBarrier ? obsBarrierMat : obsBoxMat);
      mesh.position.set(LANES[lane], isBarrier ? 0.8 : 0.45, z);
      mesh.castShadow = true;
      scene.add(mesh);
      obstacles.push({ mesh, type: isBarrier ? "barrier" : "box", lane, z });
    };

    const spawnCoin = (z, lane) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 12), coinMat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.set(LANES[lane], 1, z);
      mesh.castShadow = true;
      scene.add(mesh);
      coinObjs.push({ mesh, lane, z, collected: false });
    };

    for (let i = 0; i < 12; i++) {
      const z = -10 - i * 12;
      spawnObstacle(z);
      const cl = Math.floor(Math.random() * 3);
      for (let k = 0; k < 4; k++) spawnCoin(z - 4 - k * 1.2, cl);
    }

    const onKey = (e) => {
      const s = stateRef.current;
      if (s.phase !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        s.lane = Math.max(0, s.lane - 1);
        s.targetX = LANES[s.lane];
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        s.lane = Math.min(2, s.lane + 1);
        s.targetX = LANES[s.lane];
      } else if (e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") {
        if (s.y <= 0.01 && !s.sliding) s.yVel = 0.32;
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        if (!s.sliding && s.y <= 0.01) {
          s.sliding = true;
          s.slideTimer = 35;
        }
      }
    };
    window.addEventListener("keydown", onKey);

    const handleAction = (action) => {
      const ev = new KeyboardEvent("keydown", {
        key: action === "left" ? "ArrowLeft" : action === "right" ? "ArrowRight" : action === "jump" ? "ArrowUp" : "ArrowDown",
      });
      window.dispatchEvent(ev);
    };
    window.__runnerAction = handleAction;

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let lastUIUpdate = 0;
    let lastSpeedLabel = "CRUISING";

    const currentSubjectRef = { current: subject };
    const currentDifficultyRef = { current: difficulty };
    window.__updateRunnerSettings = (s, d) => {
      currentSubjectRef.current = s;
      currentDifficultyRef.current = d;
    };

    const triggerQuiz = () => {
      const s = stateRef.current;
      if (s.phase !== "playing") return;
      s.phase = "quiz";
      const pool = QUESTIONS[currentSubjectRef.current][currentDifficultyRef.current];
      const q = pool[Math.floor(Math.random() * pool.length)];
      setCurrentMCQ(q);
      setSelectedAnswer(null);
      setPhase("quiz");
    };

    const animate = (t) => {
      raf = requestAnimationFrame(animate);
      const s = stateRef.current;
      const moveBy = s.phase === "playing" ? s.speed : 0.05;

      if (s.phase === "playing") {
        player.position.x += (s.targetX - player.position.x) * 0.25;
        s.yVel -= 0.018;
        s.y += s.yVel;
        if (s.y < 0) { s.y = 0; s.yVel = 0; }
        player.position.y = s.y;

        if (s.sliding) {
          s.slideTimer--;
          body.scale.y = 0.5;
          body.position.y = 0.28;
          head.position.y = 0.7;
          if (s.slideTimer <= 0) {
            s.sliding = false;
            body.scale.y = 1;
            body.position.y = 0.55;
            head.position.y = 1.4;
          }
        }

        s.distance += s.speed;
        s.score += s.speed * 0.5;
        s.speed = Math.min(0.6, 0.25 + s.distance * 0.0003);

        const speedRatio = (s.speed - 0.25) / (0.6 - 0.25);
        let label = "CRUISING";
        if (speedRatio > 0.7) label = "INSANE";
        else if (speedRatio > 0.4) label = "FAST";
        else if (speedRatio > 0.15) label = "QUICK";
        if (label !== lastSpeedLabel) {
          lastSpeedLabel = label;
          setSpeedLabel(label);
        }

        if (t - lastUIUpdate > 100) {
          setScore(Math.floor(s.score + s.coins * 10));
          setCoins(s.coins);
          lastUIUpdate = t;
        }
      }

      for (const tr of trees) {
        tr.position.z += moveBy;
        if (tr.position.z > 8) {
          tr.position.z -= TREE_COUNT * 6;
          const side = Math.random() < 0.5 ? -1 : 1;
          tr.position.x = side * (5 + Math.random() * 2);
        }
      }

      for (const o of obstacles) {
        o.mesh.position.z += moveBy;
        o.z = o.mesh.position.z;
        if (o.z > 10) {
          const newZ = o.z - 12 * obstacles.length;
          o.mesh.position.z = newZ;
          o.lane = Math.floor(Math.random() * 3);
          o.mesh.position.x = LANES[o.lane];
          o.z = newZ;
        }
      }
      for (const c of coinObjs) {
        c.mesh.position.z += moveBy;
        c.z = c.mesh.position.z;
        c.mesh.rotation.z += 0.08;
        if (c.z > 10) {
          const newZ = c.z - 12 * obstacles.length;
          c.mesh.position.z = newZ;
          c.lane = Math.floor(Math.random() * 3);
          c.mesh.position.x = LANES[c.lane];
          c.collected = false;
          c.mesh.visible = true;
          c.z = newZ;
        }
      }

      if (s.phase === "playing") {
        const px = player.position.x;
        const py = player.position.y;
        const playerHeight = s.sliding ? 0.6 : 1.7;

        for (const o of obstacles) {
          if (o.z > 2.5 && o.z < 5) {
            if (Math.abs(o.mesh.position.x - px) < 0.7) {
              if (o.type === "box") {
                if (py < 0.9) {
                  triggerQuiz();
                  break;
                }
              } else {
                if (!s.sliding && playerHeight > 1) {
                  triggerQuiz();
                  break;
                }
              }
            }
          }
        }

        for (const c of coinObjs) {
          if (!c.collected && c.z > 2.5 && c.z < 5) {
            if (Math.abs(c.mesh.position.x - px) < 0.6 && Math.abs(py + 0.5 - 1) < 1) {
              c.collected = true;
              c.mesh.visible = false;
              s.coins += 1;
            }
          }
        }
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.__updateRunnerSettings?.(subject, difficulty);
  }, [subject, difficulty]);

  useEffect(() => {
    stateRef.current.phase = phase;
  }, [phase]);

  const touchAction = (a) => window.__runnerAction?.(a);

  return (
    <main className="runner-root">
      <div className="runner-canvas" ref={mountRef} />

      {(phase === "playing" || phase === "quiz") && (
        <>
          <div className="hud">
            <div className="hud-pill">
              <span className="label">Score</span>
              <span className="value">{score}</span>
            </div>
            <div className="hud-pill">
              <span className="label">Speed</span>
              <span className="value">{speedLabel}</span>
            </div>
          </div>
          <div className="controls-hint">
            ← → Lanes &nbsp;·&nbsp; ↑ / Space Jump &nbsp;·&nbsp; ↓ Slide &nbsp;·&nbsp; 🪙 {coins}
          </div>
          <div className="touch-controls">
            <button className="touch-btn" onPointerDown={() => touchAction("left")}>◀</button>
            <button className="touch-btn" onPointerDown={() => touchAction("slide")}>▼</button>
            <button className="touch-btn" onPointerDown={() => touchAction("jump")}>▲</button>
            <button className="touch-btn" onPointerDown={() => touchAction("right")}>▶</button>
          </div>
        </>
      )}

      {phase === "menu" && (
        <div className="overlay">
          <div className="panel">
            <h1>🏃 Quiz Runner 3D</h1>
            <p className="subtitle">Run, dodge, and answer to survive!</p>

            <h3>Subject</h3>
            <div className="option-grid">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  className={`opt-btn ${subject === s ? "active" : ""}`}
                  onClick={() => setSubject(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <h3>Difficulty</h3>
            <div className="option-grid cols-3">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  className={`opt-btn ${difficulty === d ? "active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>

            <button className="primary-btn" onClick={startGame}>Start Running →</button>
          </div>
        </div>
      )}

      {phase === "quiz" && currentMCQ && (
        <div className="overlay">
          <div className="panel">
            <div>
              <span className="mcq-tag">{subject}</span>
              <span className="mcq-tag">{difficulty}</span>
            </div>
            <p className="mcq-question">{currentMCQ.question}</p>
            <div className="mcq-options">
              {currentMCQ.options.map((opt) => {
                let cls = "mcq-opt";
                if (selectedAnswer) {
                  if (opt === currentMCQ.answer) cls += " correct";
                  else if (opt === selectedAnswer) cls += " wrong";
                }
                return (
                  <button
                    key={opt}
                    className={cls}
                    disabled={!!selectedAnswer}
                    onClick={() => onAnswerSelect(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {phase === "gameover" && (
        <div className="overlay">
          <div className="panel">
            <h1>💥 Game Over</h1>
            <p className="subtitle">Wrong answer! Better luck next run.</p>
            <div className="gameover-stats">
              <div>
                <div className="stat-val">{score}</div>
                <div className="stat-lbl">Score</div>
              </div>
              <div>
                <div className="stat-val">{coins}</div>
                <div className="stat-lbl">Coins</div>
              </div>
            </div>
            <button className="primary-btn" onClick={startGame}>Play Again</button>
            <button
              className="primary-btn"
              style={{ background: "transparent", color: "hsl(var(--foreground))", boxShadow: "none", border: "2px solid hsl(var(--border))", marginTop: 10 }}
              onClick={() => setPhase("menu")}
            >
              Change Subject
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
