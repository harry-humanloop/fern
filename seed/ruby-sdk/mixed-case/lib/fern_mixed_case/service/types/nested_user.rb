# frozen_string_literal: true

require_relative "user"
require "json"

module SeedMixedCaseClient
  class Service
    class NestedUser
      attr_reader :name, :nested_user, :additional_properties

      # @param name [String]
      # @param nested_user [Service::User]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [Service::NestedUser]
      def initialize(name:, nested_user:, additional_properties: nil)
        # @type [String]
        @name = name
        # @type [Service::User]
        @nested_user = nested_user
        # @type [OpenStruct] Additional properties unmapped to the current class definition
        @additional_properties = additional_properties
      end

      # Deserialize a JSON object to an instance of NestedUser
      #
      # @param json_object [JSON]
      # @return [Service::NestedUser]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        parsed_json = JSON.parse(json_object)
        name = struct.Name
        if parsed_json["NestedUser"].nil?
          nested_user = nil
        else
          nested_user = parsed_json["NestedUser"].to_json
          nested_user = Service::User.from_json(json_object: nested_user)
        end
        new(name: name, nested_user: nested_user, additional_properties: struct)
      end

      # Serialize an instance of NestedUser to a JSON object
      #
      # @return [JSON]
      def to_json(*_args)
        { "Name": @name, "NestedUser": @nested_user }.to_json
      end

      # Leveraged for Union-type generation, validate_raw attempts to parse the given hash and check each fields type against the current object's property definitions.
      #
      # @param obj [Object]
      # @return [Void]
      def self.validate_raw(obj:)
        obj.name.is_a?(String) != false || raise("Passed value for field obj.name is not the expected type, validation failed.")
        Service::User.validate_raw(obj: obj.nested_user)
      end
    end
  end
end
