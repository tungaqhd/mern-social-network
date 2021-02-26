const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
const config = require("config");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skill is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;

    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (status) {
      profileFields.status = status;
    }
    if (githubUsername) {
      profileFields.githubUsername = githubUsername;
    }
    if (skills) {
      profileFields.skills = skills;
    }
    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twitter) {
      profileFields.social.twitter = twitter;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        profile = new Profile(profileFields);
        await profile.save();
      }

      res.json(profile);
    } catch (err) {
      res.status(500).send("Server Error");
    }

    res.json(profileFields);
  }
);

//  @route   GET api/profile
//  @desc    Get all profiles
//  @access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//  @route   GET api/profile/user/:user_id
//  @desc    Get profile by user id
//  @access  Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(500).send("Server Error");
  }
});

//  @route   DELETE api/profile/
//  @desc    Get profile by user id
//  @access  Public

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    await User.findOneAndRemove({
      _id: req.user.id,
    });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//  @route   PUT api/profile/experience
//  @desc    Add profile experience
//  @access  Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("company", "Company is required").notEmpty(),
      check("from", "From is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();

      res.json({ msg: "Experience updated" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

//  @route   DELETE api/profile/experience/:exp_id
//  @desc    Delete profile experience
//  @access  Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExp = profile.experience.filter(
      (exp) => exp.id !== req.params.exp_id
    );
    profile.experience = newExp;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//  @route   PUT api/profile/education
//  @desc    Add profile education
//  @access  Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").notEmpty(),
      check("degree", "Degree is required").notEmpty(),
      check("fieldOfStudy", "Field of study is required").notEmpty(),
      check("from", "From is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldOfStudy,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();

      res.json({ msg: "Education updated" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

//  @route   DELETE api/profile/education/:exp_id
//  @desc    Delete profile education
//  @access  Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newEducation = profile.education.filter(
      (exp) => exp.id !== req.params.edu_id
    );
    profile.education = newEducation;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//  @route   GET api/profile/github/:username
//  @desc    GET user repos from Github
//  @access  PUBLIC

router.get("/github/:username", async (req, res) => {
  try {
    const result = await axios.default.get(
      `https://api.github.com/users/${
        req.params.username
      }/repos?perpage=5&sort=created:asc&client_id=${config.get(
        "clientID"
      )}&client_secret=${config.get("clientSecret")}`
    );

    if (result.status != 200) {
      return res.status(400).json({ msg: "Failed to fetch repos" });
    }

    res.send(result.data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
