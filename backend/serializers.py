from rest_framework import serializers
from django.contrib.auth import authenticate
# from django.contrib.auth.models import User


from .models import Trip,User

# //login serializers
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password =  serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        return serializers.ValidationError("Incorect Credential")
        # return super().validate(attrs)

# register serializers
class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password'
        )
        extra_kwargs={'password':{'write_only':True}}
    def create(self, validated_data):
        # return super().create(validated_data)
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user
# user serializer
class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'tel_no',
            'is_driver',
            'is_rider',
            'pic'
        )
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = (
            'id',
            'created',
            'updated',
            'pick_up_address',
            'drop_off_address',
            'status',
            'driver',
            'rider',
            'kms',
            'price',
            'capacity',
            'geo_location',
            'geo_location_lat',
            'geo_location_long',
            'to_point'
        )
        read_only_fields = ('id','created','updated',)
class ReadOnlyTripSerializer(serializers.ModelSerializer):
    # driver = UserSerilizer(read_only=True)
    # rider = UserSerilizer(read_only=True)

    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = (
            'id',
            'created',
            'updated',
            'pick_up_address',
            'drop_off_address',
            'status',
            'driver',
            'rider',
            'kms',
            'price',
            'capacity',
            'geo_location',
            'geo_location_lat',
            'geo_location_long',
            'to_point'
        )
