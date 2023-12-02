class Project {
  id: string;
  name: string;
  imageCluster: string;
  additionalOptions: any[];
  assets: any[];
  longDescription: string[];
  active: boolean;
  createdAt: string;
  constructor(
    id: string,
    name: string,
    imageCluster: string,
    additionalOptions: any[],
    assets: any[],
    longDescription: string[],
    active: boolean,
    createdAt: string
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
  id: string;
  projectId: string;
  name: string;
  image: string;
  teaser: string;
  baths: string;
  beds: string;
  squareMeters: string;
  stories: string;
  createdAt: string;
  active: boolean;
  constructor(
    id: string,
    projectId: string,
    name: string,
    image: string,
    teaser: string,
    baths: string,
    beds: string,
    squareMeters: string,
    stories: string,
    createdAt: string,
    active: boolean
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

export type ProjectSlimType = {
  id: string;
  projectId: string;
  name: string;
  image: string;
  teaser: string;
  baths: string;
  beds: string;
  squareMeters: string;
  stories: string;
  active: boolean;
  createdAt: string;
};

export type ProjectType = {
  id: string;
  name: string;
  imageCluster: string;
  additionalOptions: any[];
  assets: any[];
  longDescription: string[];
  active: boolean;
  createdAt: string;
};

module.exports = { Project, ProjectSlim };
