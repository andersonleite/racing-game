/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, PositionalAudio } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useStore } from '../../store'

useGLTF.preload('/models/chassis-draco.glb')

const c = new THREE.Color()
const Chassis = forwardRef(({ args = [2, 1.1, 4.7], mass = 500, children, ...props }, ref) => {
  const glass = useRef()
  const brake = useRef()
  const wheel = useRef()
  const needle = useRef()
  const crashAudio = useRef()

  const ready = useStore((state) => state.ready)
  const debug = useStore((state) => state.debug)
  const { nodes: n, materials: m } = useGLTF('/models/chassis-draco.glb')

  const onCollide = () => {
    crashAudio.current?.setVolume((0.4 * useStore.getState().speed) / 10)
    if (!crashAudio.current?.isPlaying) crashAudio.current?.play()
  }
  const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide, ...props }), ref)

  useFrame((_, delta) => {
    const state = useStore.getState()
    const isBraking = state.controls.brake
    const isCockpit = state.camera === 'FIRST_PERSON'
    const controls = state.controls
    brake.current.material.color.lerp(c.set(isBraking ? '#555' : 'white'), delta * 10)
    brake.current.material.emissive.lerp(c.set(isBraking ? 'red' : 'red'), delta * 10)
    brake.current.material.opacity = THREE.MathUtils.lerp(brake.current.material.opacity, isBraking ? 1 : 0.3, delta * 10)
    glass.current.material.opacity = THREE.MathUtils.lerp(glass.current.material.opacity, isCockpit ? 0.1 : 0.6, delta)
    glass.current.material.color.lerp(c.set(isCockpit ? 'white' : 'black'), delta)
    wheel.current.rotation.z = THREE.MathUtils.lerp(wheel.current.rotation.z, controls.left ? -Math.PI : controls.right ? Math.PI : 0, delta)
    needle.current.rotation.y = (state.speed / state.vehicleConfig.maxSpeed) * -Math.PI * 2 - 0.9
  })

  return (
    <group ref={ref} api={api} dispose={null}>
      <group position={[0, -0.2, -0.2]}>
        <mesh castShadow receiveShadow geometry={n.Chassis_1.geometry} material={m.BodyPaint} material-color="#f0c050" />
        <mesh castShadow geometry={n.Chassis_2.geometry} material={n.Chassis_2.material} material-color="#353535" />
        <mesh castShadow ref={glass} geometry={n.Glass.geometry} material={m.Glass} material-transparent />
        <mesh ref={brake} geometry={n.BrakeLights.geometry} material={m.BrakeLight} material-transparent />
        <mesh geometry={n.HeadLights.geometry} material={m.HeadLight} />
        <mesh geometry={n.Cabin_Grilles.geometry} material={m.Black} />
        <mesh geometry={n.Undercarriage.geometry} material={m.Undercarriage} />
        <mesh geometry={n.TurnSignals.geometry} material={m.TurnSignal} />
        <mesh geometry={n.Chrome.geometry} material={n.Chrome.material} />
        <group ref={wheel} position={[0.37, 0.25, 0.46]}>
          <mesh geometry={n.Wheel_1.geometry} material={n.Wheel_1.material} />
          <mesh geometry={n.Wheel_2.geometry} material={n.Wheel_2.material} />
        </group>
        <group position={[0, 0, 0]}>
          <mesh geometry={n.License_1.geometry} material={m.License} />
          <mesh geometry={n.License_2.geometry} material={n.License_2.material} />
        </group>
        <group position={[0.2245, 0.3045, 0.6806]} scale={[0.0594, 0.0594, 0.0594]}>
          <mesh geometry={n.Cube013.geometry} material={n.Cube013.material} />
          <mesh geometry={n.Cube013_1.geometry} material={n.Cube013_1.material} />
          <mesh geometry={n.Cube013_2.geometry} material={n.Cube013_2.material} />
        </group>
        <mesh
          geometry={n['pointer-left'].geometry}
          material={n['pointer-left'].material}
          position={[0.5107, 0.3045, 0.6536]}
          rotation={[Math.PI / 2, -1.1954, 0]}
          scale={[0.0209, 0.0209, 0.0209]}
        />
        <mesh
          ref={needle}
          geometry={n['pointer-right'].geometry}
          material={n['pointer-right'].material}
          position={[0.2245, 0.3045, 0.6536]}
          rotation={[-Math.PI / 2, -0.9187, Math.PI]}
          scale={[0.0209, 0.0209, 0.0209]}
        />
      </group>
      {children}
      {ready && <PositionalAudio ref={crashAudio} url="/sounds/crash.mp3" loop={false} autoplay={false} distance={5} />}
      {debug && (
        <mesh>
          <boxGeometry args={args} />
          <meshBasicMaterial transparent opacity={0.25} color="green" />
        </mesh>
      )}
    </group>
  )
})

export { Chassis }