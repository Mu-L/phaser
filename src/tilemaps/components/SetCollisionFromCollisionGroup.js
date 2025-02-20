/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var SetTileCollision = require('./SetTileCollision');
var CalculateFacesWithin = require('./CalculateFacesWithin');

/**
 * Sets collision on the tiles within a layer by checking each tile's collision group data
 * (typically defined in Tiled within the tileset collision editor). If any objects are found within
 * a tile's collision group, the tile's colliding information will be set. The `collides` parameter
 * controls if collision will be enabled (true) or disabled (false).
 *
 * @function Phaser.Tilemaps.Components.SetCollisionFromCollisionGroup
 * @since 3.0.0
 *
 * @param {boolean} collides - If true it will enable collision. If false it will clear collision.
 * @param {boolean} recalculateFaces - Whether or not to recalculate the tile faces after the update.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 */
var SetCollisionFromCollisionGroup = function (collides, recalculateFaces, layer)
{
    if (collides === undefined) { collides = true; }
    if (recalculateFaces === undefined) { recalculateFaces = true; }

    for (var ty = 0; ty < layer.height; ty++)
    {
        for (var tx = 0; tx < layer.width; tx++)
        {
            var tile = layer.data[ty][tx];

            if (!tile) { continue; }

            var collisionGroup = tile.getCollisionGroup();

            // It's possible in Tiled to have a collision group without any shapes, e.g. create a
            // shape and then delete the shape.
            if (collisionGroup && collisionGroup.objects && collisionGroup.objects.length > 0)
            {
                SetTileCollision(tile, collides);
            }
        }
    }

    if (recalculateFaces)
    {
        CalculateFacesWithin(0, 0, layer.width, layer.height, layer);
    }
};

module.exports = SetCollisionFromCollisionGroup;
