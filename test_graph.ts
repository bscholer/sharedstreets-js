import * as turfHelpers from "@turf/helpers";
import * as fs from "fs";
import envelope from '@turf/envelope';
import { TilePathParams } from './src/index.js';
import { Graph } from "./src/graph.js";
import test from "tape";

test("sharedstreets -- graph test", async (t: any) => {

  var params = new TilePathParams();
  params.source = 'osm/planet-181224';
  params.tileHierarchy = 7;

  // test polygon (dc area)
  const content = fs.readFileSync('test/geojson/test_route.geojson');
  var lineIn: turfHelpers.FeatureCollection<turfHelpers.LineString> = JSON.parse(content.toLocaleString());
  var graph = new Graph(envelope(lineIn), params);
  await graph.buildGraph();

  t.equal(graph.id, 'd626d5b0-0dec-3e6f-97ff-d9712228a282');

  var results = await graph.matchGeom(lineIn.features[0]);
  lineIn.features[0].geometry.coordinates.reverse();
  var results2 = await graph.matchGeom(lineIn.features[0]);


  t.end();

});

