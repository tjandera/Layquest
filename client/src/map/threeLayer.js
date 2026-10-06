/**
 * MapLibre custom layer that renders a Three.js scene in the map's own camera,
 * so the avatar, stop markers and quest path stay glued to real GPS coordinates.
 * This is one of our X-factors.
 *
 * TODO(3D): build the scene in onAdd, sync the camera from the `matrix` passed to render,
 * and call map.triggerRepaint() when the avatar moves.
 *
 * Usage: map.addLayer(createThreeLayer());
 */
export function createThreeLayer(id = 'layquest-three') {
  return {
    id,
    type: 'custom',
    renderingMode: '3d',
    onAdd(_map, _gl) {},
    render(_gl, _matrix) {},
    onRemove() {},
  };
}
