class Project {
  constructor(
    id,
    name,
    imageCluster,
    additionalOptions,
    assets,
    longDescription,
    active,
    createdAt
  ) {
    this.id = id;
    this.name = name;
    this.imageCluster = imageCluster;
    this.additionalOptions = additionalOptions;
    this.assets = assets;
    this.longDescription = longDescription;
    this.active = active;
    this.createdAt = createdAt;
  }
}

class ProjectSlim {
  constructor(
    id,
    projectId,
    name,
    image,
    teaser,
    baths,
    beds,
    squareMeters,
    stories,
    createdAt,
    active
  ) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.image = image;
    this.teaser = teaser;
    this.baths = baths;
    this.beds = beds;
    this.squareMeters = squareMeters;
    this.stories = stories;
    this.createdAt = createdAt;
    this.active = active;
  }
}

module.exports = { Project, ProjectSlim };
